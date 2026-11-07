<script setup lang="ts">
import StatusBadge from './StatusBadge.vue'
withDefaults(defineProps<{label:string;value?:string|number|null;numerator?:number|string;denominator?:number|string;unknown?:number;exclusions?:number;to?:string}>(),{value:null,numerator:undefined,denominator:undefined,unknown:0,exclusions:0})
</script>
<template><component :is="to?'router-link':'div'" :to="to" class="card kpi-tile"><span class="source-meta">{{label}}</span><strong class="kpi-value">{{denominator===0?'N/A':value??numerator??'Unknown'}}</strong><span v-if="numerator!==undefined" class="source-meta">{{numerator}} / {{denominator}} · {{unknown}} unknown · {{exclusions}} excluded</span><StatusBadge v-if="unknown" label="Unknown present" tone="unknown"/></component></template>
