<script setup lang="ts">
import {computed} from 'vue'
type Tone='neutral'|'info'|'success'|'warning'|'danger'|'verified'|'unknown'
const props=withDefaults(defineProps<{label:string;tone?:Tone;icon?:string}>(),{tone:'neutral'})
const derived=computed<Tone>(()=>{
  if(props.tone!=='neutral')return props.tone
  const value=props.label.toLowerCase()
  if(['booked','sold','verified','accepted','clean','completed','settled','connected','attended','enabled'].some(x=>value.includes(x)))return 'success'
  if(['active','reserved','submitted','sent','assessing','offered','scheduled'].some(x=>value.includes(x)))return 'info'
  if(['pending','waiting','near breach','stale','unknown','provisional','blocked','open','due'].some(x=>value.includes(x)))return 'warning'
  if(['rejected','failed','cancelled','infected','quarantined','breached','no_show','danger'].some(x=>value.includes(x)))return 'danger'
  return 'neutral'
})
const iconText=computed(()=>props.icon??({success:'✓',verified:'✓',warning:'!',danger:'!',unknown:'?'} as Record<string,string>)[derived.value]??'')
</script>
<template><span class="status-badge" :class="`status-badge--${derived}`"><span v-if="iconText" aria-hidden="true">{{iconText}}</span>{{label}}</span></template>
