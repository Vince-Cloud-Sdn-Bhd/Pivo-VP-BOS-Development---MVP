<script setup lang="ts">
import {ref} from 'vue'
const emit=defineEmits<{selected:[file:File|null]}>(),name=ref('')
function select(event:Event){const file=(event.target as HTMLInputElement).files?.[0]??null;name.value=file?.name??'';emit('selected',file)}
</script>
<template><label>Choose file<input type="file" @change="select"><span v-if="name" class="source-meta">Selected: {{name}}</span></label></template>
