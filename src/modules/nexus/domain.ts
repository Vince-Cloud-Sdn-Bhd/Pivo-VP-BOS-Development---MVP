import {useDb} from '../../stores/db'
import {reactive} from 'vue'
const processed=new Set<string>(['EVT-SEED'])
const state=reactive({lastAggregateVersion:5,lastResult:'Seed event accepted'})
export function replayEvent(event:{eventId:string;aggregateVersion:number;recordId:string}){
  if(processed.has(event.eventId))return {duplicate:true,result:'Already processed; no second booking or fee effect.'}
  processed.add(event.eventId)
  if(event.aggregateVersion<state.lastAggregateVersion)return {duplicate:false,ignored:true,result:'Out-of-order event ignored.'}
  state.lastAggregateVersion=event.aggregateVersion;state.lastResult='Event accepted once';return {duplicate:false,ignored:false,result:state.lastResult}
}
export function appointmentOutcome(){const confirmedDue=12,attended=5,noShow=5,notVerified=2;return {confirmedDue,attended,noShow,notVerified,rate:confirmedDue?attended/confirmedDue:null,accountsForAll:attended+noShow+notVerified===confirmedDue}}
export function advanceAction(id:string,stateValue:'done_pending_verify'|'verified',evidenceId?:string){
  const action=useDb().data.actionItems.find(item=>item.id===id);if(!action)throw new Error('Action item not found.')
  if(stateValue==='verified'&&!evidenceId)throw new Error('Completion evidence is required for verification.')
  action.state=stateValue;action.evidenceId=evidenceId;return action
}
