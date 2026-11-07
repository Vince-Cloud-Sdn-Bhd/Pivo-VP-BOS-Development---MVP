import {defineStore} from 'pinia'
import {computed,ref} from 'vue'
import {seedPersonas} from '../mock/seed'
import type {RoleId} from '../types'
export const useSession=defineStore('session',()=>{
  const storedUser=typeof localStorage==='undefined'?'':localStorage.getItem('pivo-mvp-user')??''
  const activeUserId=ref(storedUser||seedPersonas[0].id)
  const personas=ref([...seedPersonas])
  const activePersona=computed(()=>personas.value.find(persona=>persona.id===activeUserId.value))
  const activeRole=computed(()=>activePersona.value?.activeRole)
  function switchPersona(id:string){const persona=personas.value.find(item=>item.id===id);if(persona){activeUserId.value=id;try{localStorage.setItem('pivo-mvp-user',id)}catch{}}}
  function switchRole(role:RoleId){const persona=activePersona.value;if(persona?.roles.includes(role))persona.activeRole=role}
  function logout(){activeUserId.value='';try{localStorage.removeItem('pivo-mvp-user')}catch{}}
  return {activeUserId,personas,activePersona,activeRole,switchPersona,switchRole,logout}
})
