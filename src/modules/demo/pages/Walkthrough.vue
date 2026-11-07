<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useSession} from '../../../stores/session'
import {useClock} from '../../../stores/clock'
import {StatusBadge} from '../../../components/shared'
const router=useRouter(),session=useSession(),clock=useClock()
const steps=[
  ['Aisha','Approve project and publish inventory','/projects/project-sample'],
  ['Demo Agent','Place hold and simulate a conflict','/bookings/new?unit=unit-12-5'],
  ['Demo Agent','Create Booking with two purchasers','/bookings/new?unit=unit-12-5'],
  ['Purchaser One','Open Booking and choose channel B','/booking/booking-demo'],
  ['Mei','Record payment','/bookings/case-demo'],
  ['Raj','Verify funds and advance to BOOKED','/bookings/case-demo'],
  ['Bank A Officer','Request/review loan documents','/banker'],
  ['Firm A Associate','Review sale matter service clock','/lawyer'],
  ['Demo Developer','Publish Block A construction update','/developer'],
  ['Purchaser One','View purchase bill and upload evidence','/payments'],
  ['Sofia','Execute approved remittance','/finance'],
  ['Raj','Post fee instalments and reversal','/finance'],
  ['Daniel','Recover stalled blocker','/cs'],
  ['Purchaser One','Confirm handover slot','/appointments'],
  ['Hana','Review control room and action register','/control-room'],
]
function go(personaName:string,path:string){const persona=session.personas.find(item=>item.name===personaName);if(persona)session.switchPersona(persona.id);router.push(path)}
function advance(){clock.advance(48)}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">C-DEMO-001</p><h1>Scripted walkthrough</h1><p>Each step switches persona, navigates and states the expected visible result.</p></div><el-button @click="advance">Advance demo clock 2 days</el-button></header><div class="data-list"><article v-for="(step,index) in steps" :key="step[1]" class="card"><div class="actions" style="justify-content:space-between"><div><StatusBadge :label="`Step ${index+1}`" tone="info"/> <strong>{{step[1]}}</strong><p class="source-meta">Persona: {{step[0]}} · Route: {{step[2]}}</p></div><el-button @click="go(step[0],step[2])">Go</el-button></div></article></div></div></template>
