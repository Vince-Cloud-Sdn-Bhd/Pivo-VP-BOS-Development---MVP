import type {AuditEntry,CaseEvent,ID,ISODate,RoleId} from '../types'
import {nextId} from './ids'
export function auditEntry(actorUserId:ID,actingAsRole:RoleId,action:string,target:string,at:ISODate,detail?:string):AuditEntry{return {id:nextId('AUD'),actorUserId,actingAsRole,action,target,at,detail}}
export function caseEvent(caseId:ID,scopeType:string,scopeId:ID,actorUserId:ID,nextState:string,source:string,occurredAt:ISODate,recordedAt=occurredAt,kind:CaseEvent['kind']='state'):CaseEvent{return {id:nextId('EVT'),caseId,scopeType,scopeId,kind,actorUserId,source,nextState,evidenceIds:[],occurredAt,recordedAt}}
