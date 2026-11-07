<script setup lang="ts">
import {computed,ref} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useSession} from '../stores/session'
import {useClock} from '../stores/clock'
import {useDb} from '../stores/db'
import {useUi} from '../stores/ui'
import {moduleNav} from '../router/registry'
import {SyntheticBanner} from '../components/shared'
import AssistantDrawer from '../modules/assistant/AssistantDrawer.vue'
const session=useSession(),clock=useClock(),db=useDb(),ui=useUi(),route=useRoute(),router=useRouter(),search=ref('')
const visibleNav=computed(()=>moduleNav.filter(item=>item.roles.includes(session.activePersona?.activeRole as any)).sort((a,b)=>Number(b.to==='/product-map')-Number(a.to==='/product-map')))
const grouped=computed(()=>{const groups:Record<string,typeof moduleNav>={};for(const item of visibleNav.value)(groups[item.group||'Workspace']??=[]).push(item);return groups})
const notificationCount=computed(()=>db.data.notifications.filter(item=>item.toUserId===session.activeUserId&&item.state!=='acknowledged').length)
function selectPersona(id:string){session.switchPersona(id);router.push('/overview')}
function runSearch(){const q=search.value.trim().toLowerCase();if(!q)return;const hit=db.data.bookings.find(b=>b.id.toLowerCase().includes(q)||b.caseId.toLowerCase().includes(q));router.push(hit?`/bookings/${hit.caseId}`:'/denied')}
</script>
<template><div class="shell"><aside class="sidebar" :class="{open:ui.sidebarOpen}"><router-link class="brand" to="/overview"><img src="/brand/pivo-logo-horizontal-notagline.png" alt="PIVO" width="1729" height="428"></router-link><div v-for="(items,group) in grouped" :key="group" class="nav-group"><p class="nav-group-label">{{group}}</p><router-link v-for="item in items" :key="item.key" class="nav-link" :to="item.to"><span class="nav-label">{{item.label}}</span></router-link></div></aside><header class="topbar"><div class="actions"><el-button class="mobile-only" aria-label="Toggle navigation" @click="ui.sidebarOpen=!ui.sidebarOpen">☰</el-button><input v-model="search" aria-label="Scoped search" placeholder="Search visible cases" @keyup.enter="runSearch"><el-select :model-value="session.activeUserId" aria-label="View as persona" @change="selectPersona"><el-option v-for="persona in session.personas" :key="persona.id" :label="`${persona.name} · ${persona.activeRole}`" :value="persona.id"/></el-select></div><div class="top-actions"><span class="source-meta">{{clock.display}}</span><el-button @click="clock.advance(1)">+1h</el-button><el-button @click="clock.advance(24)">+1 day</el-button><el-button @click="clock.advance(72)">+3 days</el-button><el-button @click="ui.aiOpen=true">Assistant</el-button><el-button aria-label="Notifications">{{notificationCount}}</el-button><el-dropdown trigger="click"><el-button>{{session.activePersona?.name}}</el-button><template #dropdown><el-dropdown-menu><el-dropdown-item @click="router.push('/login')">Switch account</el-dropdown-item><el-dropdown-item @click="db.reset()">Reset demo data</el-dropdown-item></el-dropdown-menu></template></el-dropdown></div></header><main class="main-area"><div class="content"><div v-if="ui.offline" class="card" style="margin-bottom:16px">Offline simulation is active. <el-button @click="ui.offline=false">Retry</el-button></div><router-view :key="route.fullPath"/></div><footer class="footer"><SyntheticBanner/> <span style="margin-left:8px">© Vince Cloud Sdn Bhd</span></footer></main><AssistantDrawer/></div></template>
