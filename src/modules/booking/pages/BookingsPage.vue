<script setup lang="ts">
import {computed,ref} from 'vue'
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {StatusBadge,AgeChip} from '../../../components/shared'
import {fmtMoney} from '../../../lib/money'
const db=useDb(),session=useSession(),status=ref(''),overdue=ref(false),query=ref('')
const rows=computed(()=>db.data.bookings.filter(booking=>{
  const unit=db.data.units.find(item=>item.id===booking.unitId),caseRow=db.data.cases.find(item=>item.id===booking.caseId)
  const purchaser=booking.parties.map(p=>db.data.people.find(x=>x.id===p.personId)?.name).join(' ')
  return (!status.value||booking.status===status.value)&&(!overdue.value||caseRow?.openBlockers)&&`${booking.id} ${caseRow?.id} ${unit?.unitNo} ${purchaser}`.toLowerCase().includes(query.value.toLowerCase())&&(session.activePersona?.activeRole!=='agent'||booking.agentUserId===session.activeUserId)
}))
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Sales and bookings</p><h1>Bookings</h1><p>Lifecycle cases with price snapshots, independent lanes and clear next actions.</p></div><router-link to="/bookings/new"><el-button type="primary">Create booking</el-button></router-link></header><div class="card filter-bar"><label>Search<input v-model="query" placeholder="Booking, case or unit"></label><label>Status<select v-model="status"><option value="">All statuses</option><option v-for="s in ['RESERVED','BOOKED','SOLD','CANCELLED']" :key="s">{{s}}</option></select></label><label><input v-model="overdue" type="checkbox"> Open blockers only</label></div><section class="card table-scroll"><el-table :data="rows"><el-table-column label="Booking / case" min-width="170"><template #default="{row}"><router-link :to="`/bookings/${row.caseId}`">{{row.id}}</router-link><br><span class="source-meta">{{row.caseId}}</span></template></el-table-column><el-table-column label="Unit" min-width="120"><template #default="{row}">{{db.data.units.find(u=>u.id===row.unitId)?.unitNo}}</template></el-table-column><el-table-column label="Status" min-width="130"><template #default="{row}"><StatusBadge :label="row.status"/></template></el-table-column><el-table-column label="Locked price" min-width="150"><template #default="{row}">{{fmtMoney(row.priceSnapshot.listPriceMinor)}}</template></el-table-column><el-table-column label="Age" min-width="240"><template #default><AgeChip :gross="18" :active="16" :overdue="2"/></template></el-table-column></el-table></section></div></template>
