<script setup lang="ts">
import {computed,ref} from 'vue'
import {useRoute} from 'vue-router'
import {useDb} from '../../../stores/db'
import {StatusBadge} from '../../../components/shared'
import {fmtMoney} from '../../../lib/money'
const route=useRoute(),db=useDb(),message=ref(''),booking=computed(()=>db.data.bookings.find(item=>item.id===route.params.bookingId)),unit=computed(()=>db.data.units.find(item=>item.id===booking.value?.unitId)),project=computed(()=>db.data.projects.find(item=>item.id===booking.value?.projectId))
function paid(){if(!booking.value)return;booking.value.bookingFee.channel='B';booking.value.bookingFee.payment='submitted';message.value='Payment submitted. It is not verified until Finance independently checks the funds.'}
</script>
<template><div class="portal-shell"><header class="portal-header"><img src="/brand/pivo-logo-horizontal-notagline.png" alt="PIVO" width="1729" height="428" style="height:48px;width:auto"><el-button aria-label="Log out">Log out</el-button></header><main v-if="booking" class="page"><header class="page-header"><div><p class="eyebrow">Your dedicated booking</p><h1>{{project?.name}}</h1><p>{{unit?.unitNo}} · locked at {{fmtMoney(booking.priceSnapshot.listPriceMinor)}}</p></div><StatusBadge :label="booking.status"/></header><p v-if="message" class="card">{{message}}</p><section class="card"><h2>Booking fee</h2><p class="kpi-value">{{fmtMoney(booking.bookingFee.agreedMinor)}}</p><p><StatusBadge :label="booking.bookingFee.payment"/></p><h3>How to pay</h3><p>Channel B · Company bank transfer</p><p>Use the booking reference exactly as shown.</p><el-button type="primary" :disabled="booking.bookingFee.payment!=='none'" @click="paid">I have paid</el-button></section><section class="card"><h2>Status timeline</h2><StatusBadge label="RESERVED"/><StatusBadge label="BOOKED"/><StatusBadge label="SOLD"/></section></main><footer class="footer">© Vince Cloud Sdn Bhd · Synthetic demo data</footer></div></template>
