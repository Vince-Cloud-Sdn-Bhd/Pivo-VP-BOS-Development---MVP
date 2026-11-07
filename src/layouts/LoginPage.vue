<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useSession} from '../stores/session'
import {useDb} from '../stores/db'
import {SyntheticBanner} from '../components/shared'
const router=useRouter(),session=useSession(),db=useDb()
function signIn(id:string){session.switchPersona(id);const role=session.activePersona?.activeRole;const target=role==='banker'?'/banker':role==='lawyer'?'/lawyer':role==='purchaser'?'/home':role==='developer'?'/developer':role==='agent'?'/agent':role==='landowner'||role==='fund_partner'?'/jv':'/product-map';router.push(target)}
</script>
<template><main class="login-page"><section class="login-card"><div class="actions" style="justify-content:space-between"><img src="/brand/pivo-logo-horizontal-notagline.png" alt="PIVO" width="1729" height="428" style="height:48px;width:auto"><SyntheticBanner/></div><p class="eyebrow" style="margin-top:28px">Property Investment Value Optimisation</p><h1>Choose a demo persona</h1><p class="muted">Individual accounts. Verify your organisation and role. No shared login is implied.</p><div class="persona-grid"><button v-for="persona in session.personas" :key="persona.id" class="persona-card" @click="signIn(persona.id)"><strong>{{persona.name}}</strong><br><span class="muted">{{persona.title}}</span><br><small>{{db.data.orgs.find(org=>org.id===persona.orgId)?.name}}</small></button></div><p class="source-meta">© Vince Cloud Sdn Bhd · Synthetic demo data</p></section></main></template>
