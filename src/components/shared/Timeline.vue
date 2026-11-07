<script setup lang="ts">
import type {CaseEvent} from '../../types'
import {formatDateTime} from '../../lib/dates'
import StatusBadge from './StatusBadge.vue'
defineProps<{events:CaseEvent[]}>()
</script>
<template><div class="timeline"><article v-for="event in events" :key="event.id" class="timeline-item"><div class="actions"><StatusBadge :label="event.kind"/><strong>{{event.nextState}}</strong></div><p>{{event.reason||event.source}}</p><p class="source-meta">Occurred {{formatDateTime(event.occurredAt)}} · Recorded {{formatDateTime(event.recordedAt)}}</p></article></div></template>
