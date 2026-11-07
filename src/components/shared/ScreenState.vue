<script setup lang="ts">
withDefaults(defineProps<{state:'loading'|'empty'|'blocked'|'stale'|'offline'|'denied'|'ready';title?:string;message?:string;actionLabel?:string}>(),{title:'',message:'',actionLabel:''})
defineEmits<{action:[]}>()
</script>
<template><section class="card" :data-state="state" role="status"><h3>{{title||({loading:'Loading…',empty:'Nothing to show',blocked:'Action blocked',stale:'Information may be stale',offline:'Connection unavailable',denied:'Record not found',ready:'Ready'} as any)[state]}}</h3><p class="muted">{{message||({loading:'Please wait.',empty:'No records are available.',blocked:'Resolve the prerequisite before continuing.',stale:'Check the source before relying on this information.',offline:'Retry when the connection returns.',denied:'The record does not exist or you do not have access.',ready:''} as any)[state]}}</p><el-button v-if="actionLabel" @click="$emit('action')">{{actionLabel}}</el-button></section></template>
