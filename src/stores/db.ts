import {defineStore} from 'pinia'
import {reactive} from 'vue'
import {createSeed} from '../mock/seed'
import type {AuditEntry,CaseEvent,ID} from '../types'
import {nextId} from '../lib/ids'
export const useDb=defineStore('db',()=>{
  const data=reactive(createSeed())
  function byId<T extends {id:ID}>(collection:T[],id:ID){return collection.find(item=>item.id===id)}
  function recordAudit(entry:Omit<AuditEntry,'id'>){data.auditEntries.unshift({...entry,id:nextId('AUD')})}
  function recordEvent(entry:Omit<CaseEvent,'id'>){data.caseEvents.unshift({...entry,id:nextId('EVT')})}
  function reset(){Object.assign(data,createSeed());localStorage.removeItem('pivo-mvp-db')}
  function persist(){try{localStorage.setItem('pivo-mvp-db',JSON.stringify(data))}catch{}}
  return {data,byId,recordAudit,recordEvent,reset,persist}
})
