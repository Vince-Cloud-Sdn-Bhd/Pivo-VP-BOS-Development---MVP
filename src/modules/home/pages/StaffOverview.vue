<script setup lang="ts">
import {computed} from 'vue'
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {KpiTile,NextActionCard,SourceMeta,StatusBadge,AgeChip} from '../../../components/shared'
import {formatDateTime} from '../../../lib/dates'
const db=useDb(),session=useSession()
const tasks=computed(()=>db.data.tasks.filter(task=>task.state!=='done'))
const holds=computed(()=>db.data.holds.filter(hold=>hold.state==='active'))
const meta={source:'Demo lifecycle projections',asOf:db.data.meta.now,freshness:'fresh' as const,note:'Synthetic only'}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Lifecycle command centre</p><h1>Good morning, {{session.activePersona?.name}}</h1><p>See what changed, what needs action and which source is freshest.</p></div><StatusBadge label="Demo clock active" tone="info"/></header><SourceMeta :meta="meta"/><div class="card-grid"><KpiTile label="Active Bookings" :value="db.data.bookings.filter(b=>['RESERVED','BOOKED'].includes(b.status)).length" to="/bookings"/><KpiTile label="Holds expiring today" :value="holds.length" :unknown="0" to="/bookings"/><KpiTile label="Open work items" :value="tasks.length" :unknown="tasks.filter(t=>!t.ownerUserId).length" to="/cs"/><KpiTile label="Fee collection" numerator="Unknown" denominator="N/A" value="N/A" :unknown="1" to="/finance"/></div><NextActionCard what="Resolve the unowned SPA signing task" why="The developer instruction is still pending and the legal clock continues to age." due="10 Nov 2026 17:00" owner="Daniel" action-label="Open Customer Success" @action="$router.push('/cs')"/><section class="card"><h2>Needs action today</h2><div class="data-list"><article v-for="task in tasks" :key="task.id" class="data-row"><div><strong>{{task.title}}</strong><p class="source-meta">Case {{task.caseId}} · Owner {{task.ownerUserId||'Unassigned'}} · Due {{formatDateTime(task.dueAt)}}</p></div><AgeChip :gross="3" :active="2" :overdue="task.state==='blocked'?1:0"/></article></div></section></div>
</template>
