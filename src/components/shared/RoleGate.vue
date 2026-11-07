<script setup lang="ts">
import {can} from '../../lib/policy'
defineProps<{action?:string}>()
</script>
<template><slot v-if="can(action||'view')"/></template>
