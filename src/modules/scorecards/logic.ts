export interface ScoreInputs{r:{earned:number;eligible:number;weight:number};t:{earned:number;eligible:number;weight:number};q:{earned:number;eligible:number;weight:number};f:{earned:number;eligible:number;weight:number};observations:number;workItems:number}
export function scorecard(input:ScoreInputs){
  const component=(value:{earned:number;eligible:number;weight:number})=>value.eligible===0?null:(value.earned/value.eligible)*value.weight
  const parts=[input.r,input.t,input.q,input.f].map(component)
  const score=parts.some(value=>value===null)?null:parts.filter((value):value is number=>value!==null).reduce((sum,value)=>sum+value,0)
  return {score,provisional:input.workItems<10||input.observations<20||score===null,ruleVersion:'v1.0'}
}
