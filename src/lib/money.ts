import type {Money} from '../types'

export function fmtMoney(value:Money,unknownLabel='Unknown'){
  if(value===null)return unknownLabel
  const sign=value<0?'-':'',absolute=Math.abs(value),whole=String(Math.floor(absolute/100)).replace(/\B(?=(\d{3})+(?!\d))/g,','),fraction=String(absolute%100).padStart(2,'0')
  return `RM ${sign}${whole}.${fraction}`
}
export function mulBpHalfUp(minor:number,bp:number){return Math.floor((minor*bp+5000)/10000)}
export function mulRateHalfUp(minor:number,ratePercent4dp:number){return Math.floor((minor*ratePercent4dp+50)/100)}
export function splitFeeInstalments(totalFee:number,bases:number[]){
  const totalBase=bases.reduce((sum,value)=>sum+value,0)
  if(totalBase<=0)return []
  let posted=0
  return bases.map((base,index)=>{
    const cumulativeTarget=index===bases.length-1?totalFee:Math.floor((totalFee*bases.slice(0,index+1).reduce((sum,value)=>sum+value,0))/totalBase)
    const amount=cumulativeTarget-posted
    posted=cumulativeTarget
    return amount
  })
}
export function sumKnown(values:Money[]){return {total:values.reduce<number>((sum,value)=>sum+(value??0),0),unknownCount:values.filter(value=>value===null).length}}
export function loanAmount(sellingMinor:number,marginBp:number){return mulBpHalfUp(sellingMinor,marginBp)}
