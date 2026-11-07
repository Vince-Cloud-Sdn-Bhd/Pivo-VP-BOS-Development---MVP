<script setup lang="ts">
import {computed} from 'vue'
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {NextActionCard,StatusBadge} from '../../../components/shared'
const db=useDb(),session=useSession()
const booking=computed(()=>db.data.bookings.find(b=>b.parties.some(p=>p.personId===session.activePersona?.personId)))
const caseRow=computed(()=>db.data.cases.find(c=>c.id===booking.value?.caseId))
</script>
<template><div v-if="booking" class="page"><header class="page-header"><div><p class="eyebrow">Purchaser portal</p><h1>Your property journey</h1><p>Verified access to {{db.data.projects.find(p=>p.id===booking?.projectId)?.name}}.</p></div><StatusBadge :label="booking?.status||'Unknown'"/></header><NextActionCard what="Review the outstanding purchase bill" why="Only verified allocations reduce the outstanding amount. Uploaded screenshots remain pending evidence." due="15 Nov 2026" owner="Purchaser" action-label="View payments" @action="$router.push('/payments')"/><div class="card-grid"><article class="card"><h3>Required actions</h3><p>Review Bank A offer conditions.</p></article><article class="card"><h3>Information</h3><p>Construction update published for Block A.</p></article><article class="card"><h3>Unresolved issues</h3><p>Handover meter reading remains open.</p></article></div><router-link class="card" :to="`/property/${caseRow?.id}`">Open my property →</router-link></div><div v-else class="card"><h2>No property is available</h2><p>Access requires a verified purchaser relationship.</p></div></template>
