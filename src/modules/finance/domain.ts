import {useDb} from '../../stores/db'
import {useSession} from '../../stores/session'
import {DomainError} from '../../lib/errors'
import {nextId} from '../../lib/ids'
import type {RoleId} from '../../types'
function financeActor(roles:RoleId[]){const session=useSession(),db=useDb(),role=session.activePersona?.activeRole;if(!role||!roles.includes(role))throw new DomainError('FORBIDDEN','A separate authorized finance role is required.');return {db,session,role}}
export function postFeeInstalment(baseMinor:number,feeMinor:number,eventKey:string){
  const {db,session}=financeActor(['finance_approver']),existing=db.data.feeEntries.find(entry=>entry.id===`fee-${eventKey}`)
  if(existing)return existing
  const entry={id:`fee-${eventKey}`,obligationId:'ob-fee',kind:'post' as const,baseMinor,feeMinor,authorityUserId:session.activeUserId,ruleVersion:'v1',postedAt:db.data.meta.now}
  db.data.feeEntries.push(entry);return entry
}
export function reverseFee(linkedToId:string,baseMinor:number,feeMinor:number,reason:string){
  const {db,session}=financeActor(['finance_approver']),entry={id:nextId('fee-rev'),obligationId:'ob-fee',kind:'reversal' as const,baseMinor:-Math.abs(baseMinor),feeMinor:-Math.abs(feeMinor),linkedToId,reason,authorityUserId:session.activeUserId,ruleVersion:'v1',postedAt:db.data.meta.now}
  db.data.feeEntries.push(entry);return entry
}
export function prepareRemittance(){
  const {db,session}=financeActor(['finance_preparer']),remit=db.data.remittances[0]
  if(remit.state!=='prepared'&&remit.state!=='unknown'&&remit.state!=='failed')throw new DomainError('CONFLICT','Remittance is not in a preparable state.')
  remit.preparedBy=session.activeUserId;remit.state='prepared';return remit
}
export function approveRemittance(){
  const {db,session}=financeActor(['finance_approver']),remit=db.data.remittances[0]
  if(remit.preparedBy===session.activeUserId)throw new DomainError('FORBIDDEN','Preparer cannot approve.')
  if(remit.state!=='prepared')throw new DomainError('VALIDATION','Only a prepared remittance can be approved.')
  remit.approvedBy=session.activeUserId;remit.state='approved';return remit
}
export function executeRemittance(){
  const {db,session}=financeActor(['finance_executor']),remit=db.data.remittances[0]
  if(remit.state!=='approved')throw new DomainError('VALIDATION','Approval is required before execution.')
  if([remit.preparedBy,remit.approvedBy].includes(session.activeUserId))throw new DomainError('FORBIDDEN','Preparer, approver and executor must be different users.')
  remit.executedBy=session.activeUserId;remit.state='executed';return remit
}
export function markRemittanceUnknown(){
  const {db}=financeActor(['finance_executor']),remit=db.data.remittances[0];remit.state='unknown';return remit
}
export function suspendRemittanceForPayeeChange(){
  const {db,session}=financeActor(['finance_approver']),remit=db.data.remittances[0];remit.payee.changedAfterApproval=true;remit.approvedBy=undefined;remit.state='prepared';remit.idempotencyKey+='-reverify'
  return {remit,actor:session.activeUserId}
}
export function markPaid(hasEvidence:boolean){
  const {db}=financeActor(['finance_approver']);if(!hasEvidence)throw new DomainError('VALIDATION','Confirmed payment evidence is required.')
  db.data.payments[0].state='bank_confirmed'
}
export function campaignAvailable(c:{postedFundingMinor:number;creditsMinor:number;spendMinor:number;chargesMinor:number;refundsMinor:number;commitmentsMinor:number}){
  return c.postedFundingMinor+c.creditsMinor-c.spendMinor-c.chargesMinor-c.refundsMinor-c.commitmentsMinor
}
export function campaignSplit(allocationMinor:number,beforeAivoFee:boolean){
  const aivoFee=beforeAivoFee?Math.floor(allocationMinor*0.1):0,pool=allocationMinor-aivoFee,lead=Math.floor(pool*0.5),remaining=pool-lead,leader=Math.floor(remaining*0.7),investor=remaining-leader,caller=lead/2,closer=lead/2
  return {aivoFee,pool,lead,leader,investor,caller,closer}
}
