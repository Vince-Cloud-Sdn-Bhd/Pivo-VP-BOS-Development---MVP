<script setup lang="ts">
import type {ScreenMeta} from '../../types'
import {formatDateTime} from '../../lib/dates'
import StatusBadge from './StatusBadge.vue'
defineProps<{meta:ScreenMeta}>()
</script>
<template><p class="source-meta"><StatusBadge :label="meta.freshness" :tone="meta.freshness==='fresh'?'success':meta.freshness==='stale'?'warning':'unknown'"/> Source: {{meta.source}} · As of {{formatDateTime(meta.asOf)}} {{meta.note?'· '+meta.note:''}}</p></template>
