<script setup lang="ts">
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {StatusBadge,PreviewBanner} from '../../../components/shared'
import {fmtMoney} from '../../../lib/money'
const db=useDb(),session=useSession()
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Structuring and capital</p><h1>Deals and JV</h1><p>Exclusive agreements and developer-JV arrangements remain distinct.</p></div><PreviewBanner/></header><div class="card-grid"><router-link to="/jv" class="card"><h2>Partner workspaces</h2><p>Open the landowner or fund-partner view available to {{session.activePersona?.name}}.</p></router-link><article v-for="deal in db.data.deals" :key="deal.id" class="card"><StatusBadge label="JV structure"/><h2>{{db.data.projects.find(p=>p.id===deal.projectId)?.name}}</h2><p>{{fmtMoney(deal.totalMinor)}} total consideration</p><p>Cash {{deal.cashBp/100}}% · Progressive {{deal.progressiveBp/100}}% · Contra {{deal.contraBp/100}}%</p><span class="source-meta">Maker-checker approval and protected history required.</span></article></div></div></template>
