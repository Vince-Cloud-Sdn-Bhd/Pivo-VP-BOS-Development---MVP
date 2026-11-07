import {useDb} from '../../stores/db'
import {useSession} from '../../stores/session'
import {DomainError} from '../../lib/errors'
import type {Appointment,DocumentRequest,LoanApplication,LegalMatter} from '../../types'
function current(){const session=useSession(),db=useDb();if(!session.activePersona)throw new DomainError('FORBIDDEN','Sign in first.');return {db,session}}
const loanTransitions:Record<string,string[]>={collecting:['submitted'],submitted:['assessing','rejected','withdrawn'],assessing:['conditional_offer','rejected','withdrawn'],conditional_offer:['offer_accepted','expired','withdrawn'],offer_accepted:['disbursing','withdrawn'],disbursing:['disbursed'],disbursed:[],rejected:[],withdrawn:[],expired:[]}
export function transitionLoan(id:string,next:LoanApplication['stage'],expectedVersion:number){
  const {db,session}=current(),loan=db.data.loanApplications.find(item=>item.id===id)
  if(!loan)throw new DomainError('NOT_FOUND','Loan application not found.')
  if(loan.bankOrgId!==session.activePersona?.orgId&&session.activePersona?.activeRole!=='admin')throw new DomainError('NOT_FOUND','Loan application not found.')
  if(loan.version!==expectedVersion)throw new DomainError('STALE_VERSION','Application changed. Reload before continuing.')
  if(!loanTransitions[loan.stage].includes(next))throw new DomainError('VALIDATION',`Cannot move from ${loan.stage} to ${next}.`)
  loan.stage=next;loan.version+=1;db.data.meta.now
  db.recordAudit({actorUserId:session.activeUserId,actingAsRole:session.activePersona!.activeRole,action:'LOAN_TRANSITION',target:id,at:db.data.meta.now,detail:`${loan.stage} -> ${next}`})
  return loan
}
export function uploadDocument(id:string,fileName:string){
  const {db,session}=current(),document=db.data.documents.find(item=>item.id===id)
  if(!document)throw new DomainError('NOT_FOUND','Document request not found.')
  document.versions.push({id:`dv-${Date.now()}`,fileName,uploadedAt:db.data.meta.now,byUserId:session.activeUserId,scan:'pending'});document.state='uploaded';return document
}
export function reviewDocument(id:string,accept:boolean){
  const {db,session}=current(),document=db.data.documents.find(item=>item.id===id)
  if(!document)throw new DomainError('NOT_FOUND','Document request not found.')
  const latest=document.versions.at(-1);if(!latest)throw new DomainError('VALIDATION','No uploaded version exists.')
  if(!accept){latest.scan='infected';document.state='quarantined';document.rejectionReason='Security scan failed'}else{latest.scan='clean';document.state='accepted'}
  db.recordAudit({actorUserId:session.activeUserId,actingAsRole:session.activePersona!.activeRole,action:accept?'DOCUMENT_ACCEPTED':'DOCUMENT_QUARANTINED',target:id,at:db.data.meta.now})
  return document
}
export function addLegalMilestone(id:string,stage:LegalMatter['stage'],expectedVersion:number){
  const {db,session}=current(),matter=db.data.legalMatters.find(item=>item.id===id)
  if(!matter)throw new DomainError('NOT_FOUND','Legal matter not found.')
  if(matter.firmOrgId!==session.activePersona?.orgId&&session.activePersona?.activeRole!=='admin')throw new DomainError('NOT_FOUND','Legal matter not found.')
  if(matter.version!==expectedVersion)throw new DomainError('STALE_VERSION','Matter changed. Reload before continuing.')
  matter.stage=stage;matter.version+=1;return matter
}
export function confirmAppointment(slotId:string,requestKey:string){
  const {db,session}=current(),existing=db.data.appointments.find(item=>item.requestKey===requestKey)
  if(existing)return existing
  const slot=db.data.slots.find(item=>item.id===slotId);if(!slot)throw new DomainError('NOT_FOUND','Slot not found.')
  if(slot.taken>=slot.capacity)throw new DomainError('CONFLICT','Appointment slot is taken.')
  slot.taken+=1
  const appointment:Appointment={id:`appt-${Date.now()}`,caseId:'case-demo',kind:slot.id==='slot-handover'?'handover':'spa_signing',slotId,state:'confirmed',version:1,requestKey,originalStart:slot.start}
  db.data.appointments.push(appointment)
  db.recordAudit({actorUserId:session.activeUserId,actingAsRole:session.activePersona!.activeRole,action:'APPOINTMENT_CONFIRMED',target:appointment.id,at:db.data.meta.now})
  return appointment
}
export function publishConstruction(id:string){
  const {db,session}=current(),update=db.data.constructionUpdates.find(item=>item.id===id)
  if(!update)throw new DomainError('NOT_FOUND','Construction update not found.')
  if(session.activePersona?.activeRole!=='developer'&&session.activePersona?.activeRole!=='admin')throw new DomainError('FORBIDDEN','Publishing authority required.')
  update.published=true;update.publishedAt=db.data.meta.now;update.approvedBy=session.activeUserId;update.version+=1
  return update
}
export function completeHandover(caseId:string){
  const {db}=current(),record=db.data.handovers.find(item=>item.caseId===caseId)
  if(!record)throw new DomainError('NOT_FOUND','Handover record not found.')
  if(record.clearances.some(item=>!item.done))throw new DomainError('VALIDATION','All readiness clearances must be complete.')
  record.completedAt=db.data.meta.now;record.keysDelivered=true;return record
}
