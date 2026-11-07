<script setup lang="ts">
import {computed} from 'vue'
import StatusBadge from './StatusBadge.vue'
const props=defineProps<{gross:number;active?:number;overdue?:number}>()
const label=computed(()=>`Gross ${props.gross}d · Active ${props.active??props.gross}d · Overdue ${props.overdue??0}d`)
</script>
<template><StatusBadge :label="label" :tone="overdue?'warning':'neutral'"/></template>
