import type {RoleId} from '../../types'
export function assistantAnswer(question:string,role:RoleId,outage=false){
  if(outage)return {tier:'Unavailable',answer:'Simulated AI outage. Core booking, banking and finance workflows remain available.',sources:[],handoff:'Continue through the relevant operational screen.'}
  const lower=question.toLowerCase()
  if(lower.includes('approve')&&lower.includes('loan'))return {tier:'Tier 4 prohibited',answer:'I cannot approve a loan. The assigned human bank credit officer must make that decision.',sources:['loan-a v2'],handoff:'Contact the assigned bank credit officer.'}
  if(lower.includes('pay')&&lower.includes('refund'))return {tier:'Tier 4 prohibited',answer:'I cannot pay a refund or move money. The authorized Finance executor must act after independent approval.',sources:['refund-demo v1'],handoff:'Contact the assigned Finance approver and executor.'}
  if(lower.includes('ignore previous')||lower.includes('approve this loan'))return {tier:'Untrusted content',answer:'The document contains instructions. It is treated as untrusted content and was not followed.',sources:['uploaded document'],handoff:'Review the document through the document-review queue.'}
  if(role==='purchaser')return {tier:'Tier 1 explain',answer:'Your next action is to review the outstanding purchase bill. Uploading a screenshot does not reduce the balance.',sources:['bill-demo v1','allocation-bank v1','allocation-cash v1'],handoff:'Daniel, your Customer Success contact.'}
  if(role==='banker')return {tier:'Tier 1 explain',answer:'Review Bank A application loan-a only. One offer condition remains unmet.',sources:['loan-a v2','doc-1 v1'],handoff:'Assigned bank credit officer.'}
  return {tier:'Tier 1 explain',answer:'Resolve the unowned SPA signing task and preserve the active legal service clock.',sources:['task-2 v1','matter-sale v1'],handoff:'Customer Success coordinator Daniel.'}
}
