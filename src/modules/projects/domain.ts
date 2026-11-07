import {useDb} from '../../stores/db'
import {useSession} from '../../stores/session'
import {nextId} from '../../lib/ids'
import type {Project,Unit} from '../../types'

export function createProject(name:string,code:string){
  const db=useDb(),session=useSession(),id=nextId('project')
  const project:Project={id,name,developerOrgId:'org-dev',mode:'exclusive',status:'setup',blocks:[{id:nextId('block'),name:'Block A',floors:10}],holdPolicy:{minutes:120,policyVersion:'v1'},bookingFeePolicyMinor:100000,paymentChannels:{A:false,B:true},payeeName:'Demo Payee'}
  db.data.projects.push(project)
  db.recordAudit({actorUserId:session.activeUserId,actingAsRole:session.activePersona?.activeRole??'admin',action:'PROJECT_CREATED',target:id,at:db.data.meta.now,detail:code})
  return project
}
export function importUnits(project:Project,rows:string[]){
  const db=useDb(),accepted:string[]=[],rejected:{row:number;reason:string}[]=[],seen=new Set(db.data.units.filter(unit=>unit.projectId===project.id).map(unit=>unit.unitNo))
  rows.forEach((line,index)=>{
    const [unitNo,status,price]=line.split(',').map(value=>value.trim())
    if(!unitNo||seen.has(unitNo)){rejected.push({row:index+1,reason:'Duplicate or missing unit number'});return}
    if(!['available','blocked'].includes(status)){rejected.push({row:index+1,reason:'Invalid status'});return}
    const listPriceMinor=Number(price)
    if(!Number.isInteger(listPriceMinor)||listPriceMinor<=0){rejected.push({row:index+1,reason:'Price must be integer sen'});return}
    seen.add(unitNo)
    const unit:Unit={id:nextId('unit'),projectId:project.id,blockId:project.blocks[0].id,floor:1,unitNo,layoutId:'layout-a',areaSqft:980,listPriceMinor,priceVersionId:'price-v2',status:status as Unit['status'],version:1,allocatedAgencyIds:[],updatedAt:db.data.meta.now}
    db.data.units.push(unit);accepted.push(unitNo)
  })
  return {accepted,rejected}
}
