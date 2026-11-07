<script setup lang="ts">
import StatusBadge from './StatusBadge.vue'
defineProps<{title:string;state:string;owner?:string;next?:string;blocker?:string}>()
</script>
<template><section class="card"><div class="actions" style="justify-content:space-between"><h3>{{title}}</h3><StatusBadge :label="state"/></div><p class="source-meta">Owner {{owner||'Unassigned'}} · Next {{next||'No next action recorded'}}</p><p v-if="blocker" class="form-error">Blocker: {{blocker}}</p></section></template>
