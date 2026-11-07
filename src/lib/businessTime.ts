const HOUR=3600000
export function businessHoursBetween(from:string,to:string){
  const start=new Date(from),end=new Date(to);let total=0
  for(let cursor=new Date(start);cursor<end;cursor=new Date(cursor.getTime()+HOUR)){
    const day=cursor.getUTCDay(),hour=cursor.getUTCHours()+8
    if(day!==0&&day!==6&&hour>=9&&hour<18)total+=1
  }
  return total
}
export function addBusinessHours(from:string,hours:number){
  const cursor=new Date(from);let added=0
  while(added<hours){
    cursor.setTime(cursor.getTime()+HOUR)
    const day=cursor.getUTCDay(),hour=cursor.getUTCHours()+8
    if(day!==0&&day!==6&&hour>=9&&hour<18)added+=1
  }
  return cursor.toISOString()
}
