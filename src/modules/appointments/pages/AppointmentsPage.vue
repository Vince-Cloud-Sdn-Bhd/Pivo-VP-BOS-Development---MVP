<script setup lang="ts">
import {ref} from 'vue'
import {useDb} from '../../../stores/db'
import {StatusBadge} from '../../../components/shared'
import {confirmAppointment} from '../../partner/domain'
const db=useDb(),message=ref('')
function confirm(){message.value='';try{const result=confirmAppointment('slot-handover',`request-${Date.now()}`);message.value=`Confirmed ${result.id}. Invitation, confirmation, attendance and handover remain separate facts.`}catch(e){message.value=e instanceof Error?e.message:''}}
function simultaneous(){confirm();try{confirmAppointment('slot-handover',`request-${Date.now()}-2`)}catch(e){message.value+=' '+String(e)}}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Separate facts</p><h1>Appointments</h1><p>Confirmation consumes capacity exactly once; attendance and handover require independent evidence.</p></div></header><p v-if="message" class="card">{{message}}</p><div class="card-grid"><article v-for="slot in db.data.slots" :key="slot.id" class="card"><h2>{{slot.resourceId}}</h2><p>{{slot.start}} · capacity {{slot.taken}}/{{slot.capacity}}</p><StatusBadge :label="slot.taken>=slot.capacity?'Taken':'Available'"/></article></div><div class="card actions"><el-button type="primary" @click="confirm">Confirm handover slot</el-button><el-button @click="simultaneous">Simulate two confirmations</el-button></div><section class="card table-scroll"><h2>Appointments</h2><el-table :data="db.data.appointments"><el-table-column prop="id" label="Appointment"/><el-table-column prop="kind" label="Kind"/><el-table-column label="State"><template #default="{row}"><StatusBadge :label="row.state"/></template></el-table-column><el-table-column prop="originalStart" label="Original start"/></el-table></section></div></template>
