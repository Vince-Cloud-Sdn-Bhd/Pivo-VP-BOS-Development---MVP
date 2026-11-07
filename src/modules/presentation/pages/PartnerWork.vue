<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useSession} from '../../../stores/session'
import {StatusBadge} from '../../../components/shared'
const router=useRouter(),session=useSession()
const portals=[
  ['Banker portal','Bank A Officer','/banker','Loan applications, offer conditions and document review'],
  ['Lawyer portal','Firm A Associate','/lawyer','Sale and loan matters with independent service clocks'],
  ['Developer portal','Demo Developer','/developer','Construction publication and handover readiness'],
  ['Agent workspace','Demo Agent','/agent','Allocated inventory and attributed Bookings only'],
] as const
function open(name:string,path:string){const persona=session.personas.find(item=>item.name===name);if(persona)session.switchPersona(persona.id);router.push(path)}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Partner work</p><h1>Partner Work</h1><p>Staff can review each external portal in a scoped demo persona. These links do not create cross-organisation access.</p></div><StatusBadge label="Read-only overview"/></header><div class="card-grid"><article v-for="[title,persona,path,detail] in portals" :key="title" class="card"><h2>{{title}}</h2><p>{{detail}}</p><StatusBadge label="Scoped portal"/><div style="margin-top:16px"><el-button @click="open(persona,path)">Open portal</el-button></div></article></div><section class="card"><h2>Isolation rules</h2><p>Bank A cannot see Bank B. Firm A cannot see Firm B. Agents see allocated inventory only. Every route rechecks the active role and assignment.</p></section></div></template>
