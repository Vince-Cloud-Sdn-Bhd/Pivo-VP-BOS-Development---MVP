<script setup lang="ts">
defineProps<{what:string;why:string;due?:string;owner?:string;actionLabel?:string}>()
defineEmits<{action:[]}>()
</script>
<template><section class="card"><p class="eyebrow">Next action</p><h2>{{what}}</h2><p>{{why}}</p><div class="actions"><span class="source-meta">Due {{due||'not set'}} · Owner {{owner||'unassigned'}}</span><el-button type="primary" @click="$emit('action')">{{actionLabel||'Open'}}</el-button></div></section></template>
