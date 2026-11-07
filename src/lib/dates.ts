import type {ISODate} from '../types'
export const MY_TZ='Asia/Kuala_Lumpur'
export function formatDate(value?:ISODate){if(!value)return 'Not recorded';return new Intl.DateTimeFormat('en-MY',{timeZone:MY_TZ,day:'2-digit',month:'short',year:'numeric'}).format(new Date(value))}
export function formatDateTime(value?:ISODate){if(!value)return 'Not recorded';return new Intl.DateTimeFormat('en-MY',{timeZone:MY_TZ,day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value))}
export function daysBetween(from:ISODate,to:ISODate){return Math.max(0,Math.floor((new Date(to).getTime()-new Date(from).getTime())/86400000))}
export function addMinutes(date:ISODate,minutes:number){return new Date(new Date(date).getTime()+minutes*60000).toISOString()}
