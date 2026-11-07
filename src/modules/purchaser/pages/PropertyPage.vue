<script setup lang="ts">
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {StatusBadge} from '../../../components/shared'
const route=useRoute(),db=useDb(),session=useSession()
const caseRow=computed(()=>db.data.cases.find(c=>c.id===route.params.caseId))
const booking=computed(()=>db.data.bookings.find(b=>b.caseId===caseRow.value?.id))
const allowed=computed(()=>Boolean(booking.value?.parties.some(p=>p.personId===session.activePersona?.personId)))
</script>
<template><div v-if="caseRow&&booking&&allowed" class="page"><header class="page-header"><div><p class="eyebrow">My property</p><h1>{{db.data.projects.find(p=>p.id===booking?.projectId)?.name}}</h1><p>{{db.data.units.find(u=>u.id===booking?.unitId)?.unitNo}}</p></div><StatusBadge :label="booking?.status||'Unknown'"/></header><div class="card-grid"><article class="card"><h2>Layout</h2><StatusBadge label="Contracted"/><StatusBadge label="Revised"/><p>980 sq ft · layout version 2</p></article><article class="card"><h2>Purchase team</h2><p>Primary PIC: Daniel</p><p>Backup PIC: Aisha</p></article><article class="card"><h2>Loans and documents</h2><router-link to="/documents">Open my documents</router-link><p class="source-meta">Private loan files are visible only to the named applicant.</p></article></div></div><div v-else class="card"><h2>Record not found</h2><p>The record does not exist or you do not have access.</p></div></template>
