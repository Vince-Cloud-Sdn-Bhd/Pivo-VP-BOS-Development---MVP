export function monthlyMortgage(principal:number,annualRatePercent:number,months:number){
  if(principal<=0||months<=0)return null
  const rate=annualRatePercent/100/12
  if(rate===0)return Math.round(principal/months)
  return Math.round(principal*rate/(1-Math.pow(1+rate,-months)))
}
