<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useSession} from '../../../stores/session'
import {useDb} from '../../../stores/db'
import {StatusBadge} from '../../../components/shared'
const session=useSession(),db=useDb(),router=useRouter()
function choose(id:string){session.switchPersona(id);router.push('/overview')}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Synthetic walkthrough</p><h1>Demo guide</h1><p>Every persona uses the same fictional hero case, with permissions enforced by role and assignment.</p></div></header><div class="card-grid"><article v-for="persona in session.personas" :key="persona.id" class="card"><h3>{{persona.name}}</h3><p>{{persona.title}}</p><StatusBadge :label="persona.activeRole"/><p class="source-meta">{{db.data.orgs.find(o=>o.id===persona.orgId)?.name}}</p><el-button @click="choose(persona.id)">Switch to this persona</el-button></article></div></div></template>
