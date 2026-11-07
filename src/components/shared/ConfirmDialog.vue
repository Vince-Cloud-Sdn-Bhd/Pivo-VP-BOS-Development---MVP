<script setup lang="ts">
defineProps<{open:boolean;title:string;summary:string;confirmLabel?:string}>()
defineEmits<{confirm:[];cancel:[]}>()
</script>
<template><el-dialog :model-value="open" :title="title" width="520" @close="$emit('cancel')"><p>{{summary}}</p><div class="actions" style="justify-content:flex-end"><el-button @click="$emit('cancel')">Cancel</el-button><el-button type="primary" @click="$emit('confirm')">{{confirmLabel||'Confirm'}}</el-button></div></el-dialog></template>
