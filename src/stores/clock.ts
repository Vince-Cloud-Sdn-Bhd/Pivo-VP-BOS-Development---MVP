import {defineStore} from 'pinia'
import {computed,ref} from 'vue'
const DEMO_NOW='2026-11-09T10:00:00+08:00'
export const useClock=defineStore('clock',()=>{
  const now=ref(DEMO_NOW)
  const display=computed(()=>new Intl.DateTimeFormat('en-MY',{timeZone:'Asia/Kuala_Lumpur',weekday:'short',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(now.value)))
  function advance(hours:number){now.value=new Date(new Date(now.value).getTime()+hours*3600000).toISOString()}
  function reset(){now.value=DEMO_NOW}
  return {now,display,advance,reset}
})
