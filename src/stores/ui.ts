import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUi=defineStore('ui',()=>{
  const sidebarOpen=ref(false),aiOpen=ref(false),offline=ref(false),aiOutage=ref(false),assistantContext=ref<string[]>([])
  return {sidebarOpen,aiOpen,offline,aiOutage,assistantContext}
})
