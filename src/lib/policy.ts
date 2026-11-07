import {useSession} from '../stores/session'
import {useDb} from '../stores/db'
import type {Assignment,ID,RoleId} from '../types'
const actionRoles:Record<string,RoleId[]>={
  view:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer','agent','banker','lawyer','purchaser','landowner','fund_partner','relationship_manager'],
  act:['admin','coordinator','agent','banker','lawyer','developer','relationship_manager'],
  approve:['admin','finance_approver','leadership'],
  execute:['finance_executor'],
  publish:['admin','developer'],
  export:['admin','finance_preparer','finance_approver','finance_executor','leadership'],
}
export function can(action:string,resource?:{orgId?:ID;scopeId?:ID}){
  const session=useSession(),db=useDb(),role=session.activePersona?.activeRole
  if(!role||!actionRoles[action]?.includes(role))return false
  if(['admin','leadership'].includes(role)||!resource?.orgId&&!resource?.scopeId)return true
  return db.data.assignments.some(a=>a.userId===session.activeUserId&&a.role===role&&(!a.to||new Date(a.to)>=new Date(db.data.meta.now))&&(!resource.orgId||a.orgId===resource.orgId)&&(!resource.scopeId||a.scopeId===resource.scopeId))
}
export function activeAssignments(scopeType?:Assignment['scopeType']){const session=useSession(),db=useDb();return db.data.assignments.filter(a=>a.userId===session.activeUserId&&(!scopeType||a.scopeType===scopeType)&&(!a.to||new Date(a.to)>=new Date(db.data.meta.now)))}
export function visibleCases(){const db=useDb();return db.data.cases.filter(c=>can('view',{scopeId:c.id})||can('view',{scopeId:c.bookingId}))}
export function visibleLoans(){const session=useSession(),db=useDb();return db.data.loanApplications.filter(loan=>loan.bankOrgId===session.activePersona?.orgId||session.activePersona?.activeRole==='admin'||session.activePersona?.activeRole==='leadership')}
export function visibleMatters(){const session=useSession(),db=useDb();return db.data.legalMatters.filter(matter=>matter.firmOrgId===session.activePersona?.orgId||session.activePersona?.activeRole==='admin'||session.activePersona?.activeRole==='leadership')}
export function visibleDocuments(){const session=useSession(),db=useDb();return db.data.documents.filter(doc=>!doc.requestingOrgId||doc.requestingOrgId===session.activePersona?.orgId||doc.applicantPersonId===session.activePersona?.personId||session.activePersona?.activeRole==='admin')}
