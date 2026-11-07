<script setup lang="ts">
import {computed} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useSession} from '../stores/session'
import {SyntheticBanner} from '../components/shared'
import {useUi} from '../stores/ui'
import AssistantDrawer from '../modules/assistant/AssistantDrawer.vue'
const ui=useUi()
const session=useSession(),route=useRoute(),router=useRouter()
const base=import.meta.env.BASE_URL
const role=computed(()=>session.activePersona?.activeRole)
const tabs=computed<[string,string][]>(()=>{
  if(role.value==='banker')return [['/banker','My applications'],['/documents','Documents'],['/tasks','Tasks']]
  if(role.value==='lawyer')return [['/lawyer','My matters'],['/documents','Documents'],['/tasks','Tasks']]
  if(role.value==='purchaser')return [['/home','Home'],['/property/case-demo','My property'],['/progress','Progress'],['/payments','Payments'],['/help','Help']]
  if(role.value==='landowner'||role.value==='fund_partner')return [['/jv','My holding'],['/documents','Documents']]
  return [['/developer','My projects']]
})
function logout(){session.logout();router.push('/login')}
</script>
<template><div class="portal-shell"><header class="portal-header"><img :src="`${base}brand/pivo-logo-horizontal-notagline.png`" alt="PIVO" width="1729" height="428" style="height:40px;width:auto"><div class="actions"><SyntheticBanner/><el-button @click="ui.aiOpen=true">Assistant</el-button><el-button @click="logout">Log out</el-button></div></header><nav class="portal-nav" aria-label="Portal navigation"><router-link v-for="[to,label] in tabs" :key="to" :to="to">{{label}}</router-link></nav><router-view :key="route.fullPath"/><footer class="footer">© Vince Cloud Sdn Bhd · Synthetic demo data</footer><AssistantDrawer/></div></template>
