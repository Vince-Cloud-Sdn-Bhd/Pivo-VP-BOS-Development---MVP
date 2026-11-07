import {useDb} from '../../stores/db'
import {useSession} from '../../stores/session'
import {DomainError} from '../../lib/errors'
import {nextId} from '../../lib/ids'
import {addMinutes} from '../../lib/dates'
import {loanAmount} from '../../lib/money'
import type {Booking,Case,CaseParty,Hold,Unit} from '../../types'

function actor(){const session=useSession();if(!session.activeUserId||!session.activePersona)throw new DomainError('FORBIDDEN','Sign in before changing records.');return session}
function unitById(id:string){const db=useDb(),unit=db.data.units.find(item=>item.id===id);if(!unit)throw new DomainError('NOT_FOUND','Unit not found.');return {db,unit}}
export function placeHold(unitId:string,expectedVersion:number,requestKey:string){
  const {db,unit}=unitById(unitId),existing=db.data.holds.find(hold=>hold.requestKey===requestKey)
  if(existing){if(existing.unitId!==unitId)throw new DomainError('IDEMPOTENCY_CONFLICT','This request key was used for another hold.');return existing}
  if(unit.version!==expectedVersion)throw new DomainError('STALE_VERSION','The unit changed. Reload before placing a hold.')
  if(unit.status!=='available')throw new DomainError('CONFLICT','This unit is not available.')
  if(db.data.holds.some(hold=>hold.unitId===unitId&&hold.state==='active'))throw new DomainError('CONFLICT','Another active hold already exists for this unit.')
  const session=actor(),project=db.data.projects.find(item=>item.id===unit.projectId)!
  const hold:Hold={id:nextId('hold'),unitId,byUserId:session.activeUserId,requestKey,state:'active',createdAt:db.data.meta.now,expiresAt:addMinutes(db.data.meta.now,project.holdPolicy.minutes),policyVersion:project.holdPolicy.policyVersion,paymentState:'none'}
  db.data.holds.push(hold)
  unit.status='reserved';unit.version+=1
  db.recordAudit({actorUserId:session.activeUserId,actingAsRole:session.activePersona!.activeRole,action:'HOLD_PLACED',target:hold.id,at:db.data.meta.now,detail:unitId})
  return hold
}
export function createBooking(input:{holdId:string;purchasers:{name:string;email:string;identityNo:string;role:'primary'|'joint'}[];requestKey:string}){
  const db=useDb(),session=actor(),hold=db.data.holds.find(item=>item.id===input.holdId)
  if(!hold)throw new DomainError('NOT_FOUND','Hold not found.')
  const existing=db.data.bookings.find(item=>item.requestKey===input.requestKey)
  if(existing)return existing
  if(hold.state!=='active'||new Date(hold.expiresAt)<new Date(db.data.meta.now))throw new DomainError('CONFLICT','The hold has expired or is no longer active.')
  if(!input.purchasers.length||input.purchasers.some(p=>!p.name||(!p.email&&!p.identityNo)))throw new DomainError('VALIDATION','Purchaser name, contact and NRIC / Passport No are required.')
  const unit=db.data.units.find(item=>item.id===hold.unitId)!,project=db.data.projects.find(item=>item.id===unit.projectId)!
  const bookingId=nextId('BK'),caseId=nextId('C')
  const parties:CaseParty[]=input.purchasers.map(p=>{
    let person=db.data.people.find(item=>item.email===p.email)
    if(!person){person={id:nextId('person'),name:p.name,email:p.email,identityNo:p.identityNo,identityKind:'NRIC'};db.data.people.push(person)}
    return {personId:person.id,role:p.role,from:db.data.meta.now,verified:true}
  })
  const booking:Booking={id:bookingId,caseId,unitId:unit.id,projectId:unit.projectId,status:'RESERVED',priceSnapshot:{listPriceMinor:unit.listPriceMinor,priceVersionId:unit.priceVersionId,layoutId:unit.layoutId,lockedAt:db.data.meta.now},bookingFee:{policyMinor:project.bookingFeePolicyMinor,agreedMinor:project.bookingFeePolicyMinor,payment:'none'},parties,agentOrgId:session.activePersona?.activeRole==='agent'?session.activePersona.orgId:undefined,agentUserId:session.activePersona?.activeRole==='agent'?session.activeUserId:undefined,requestKey:input.requestKey,version:1,createdAt:db.data.meta.now}
  const caseRow:Case={id:caseId,bookingId,projectId:unit.projectId,unitId:unit.id,summary:'New purchaser booking',openBlockers:0}
  db.data.bookings.push(booking);db.data.cases.push(caseRow);hold.state='converted';hold.bookingId=bookingId
  db.recordAudit({actorUserId:session.activeUserId,actingAsRole:session.activePersona!.activeRole,action:'BOOKING_CREATED',target:bookingId,at:db.data.meta.now,detail:caseId})
  db.recordEvent({caseId,scopeType:'booking',scopeId:bookingId,kind:'state',actorUserId:session.activeUserId,source:'Guided booking',prevState:'hold',nextState:'RESERVED',evidenceIds:[],occurredAt:db.data.meta.now,recordedAt:db.data.meta.now})
  return booking
}
export function requestFeeVariance(bookingId:string,amountMinor:number,reason:string){
  const db=useDb(),session=actor(),booking=db.data.bookings.find(item=>item.id===bookingId)
  if(!booking)throw new DomainError('NOT_FOUND','Booking not found.');if(booking.bookingFee.payment!=='none')throw new DomainError('CONFLICT','No variance after the purchaser pays.')
  if(amountMinor<=0||!reason.trim())throw new DomainError('VALIDATION','A positive fee and written reason are required.')
  booking.bookingFee.agreedMinor=amountMinor;booking.bookingFee.variance={reason:reason.trim(),requestedBy:session.activeUserId}
  return booking
}
export function approveFeeVariance(bookingId:string){
  const db=useDb(),session=actor(),booking=db.data.bookings.find(item=>item.id===bookingId)
  if(!booking?.bookingFee.variance)throw new DomainError('NOT_FOUND','No variance request exists.')
  if(session.activePersona?.activeRole!=='admin')throw new DomainError('FORBIDDEN','Superadmin approval is required.')
  if(booking.bookingFee.variance.requestedBy===session.activeUserId)throw new DomainError('FORBIDDEN','A different Superadmin must approve the variance.')
  booking.bookingFee.variance.approvedBy=session.activeUserId
  return booking
}
export function recordBookingPayment(bookingId:string,channel:'A'|'B'){
  const booking=useDb().data.bookings.find(item=>item.id===bookingId),session=actor()
  if(!booking)throw new DomainError('NOT_FOUND','Booking not found.');booking.bookingFee.payment='submitted';booking.bookingFee.channel=channel;booking.bookingFee.recordedBy=session.activeUserId
  return booking
}
export function verifyBookingPayment(bookingId:string){
  const booking=useDb().data.bookings.find(item=>item.id===bookingId),session=actor()
  if(!booking)throw new DomainError('NOT_FOUND','Booking not found.')
  if(booking.bookingFee.recordedBy===session.activeUserId)throw new DomainError('FORBIDDEN','The recorder cannot verify their own payment.')
  booking.bookingFee.payment='verified';booking.bookingFee.verifiedBy=session.activeUserId
  return booking
}
export function markBooked(bookingId:string){
  const booking=useDb().data.bookings.find(item=>item.id===bookingId)
  if(!booking)throw new DomainError('NOT_FOUND','Booking not found.')
  const variance=booking.bookingFee.variance
  if(booking.bookingFee.payment!=='verified')throw new DomainError('VALIDATION','Payment must be verified.')
  if(variance&&!variance.approvedBy)throw new DomainError('VALIDATION','Fee variance requires a different Superadmin approval.')
  if(booking.parties.some(p=>!p.verified))throw new DomainError('VALIDATION','All purchaser information must be verified.')
  booking.status='BOOKED';return booking
}
export function markSold(bookingId:string,marginBp:number){
  const booking=useDb().data.bookings.find(item=>item.id===bookingId)
  if(!booking||booking.status!=='BOOKED')throw new DomainError('VALIDATION','Only a BOOKED case can become SOLD.')
  const sellingMinor=booking.priceSnapshot.listPriceMinor;if(sellingMinor===null)throw new DomainError('VALIDATION','Price is unknown.')
  booking.sold={sellingMinor,marginBp,loanMinor:loanAmount(sellingMinor,marginBp)};booking.status='SOLD';return booking
}
