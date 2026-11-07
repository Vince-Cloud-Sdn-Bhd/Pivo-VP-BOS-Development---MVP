<script setup lang="ts">
import {PreviewBanner} from '../../../components/shared'
withDefaults(defineProps<{title?:string;detail?:string}>(),{title:'Coming next',detail:'This module is wired in a later implementation part.'})
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">PIVO module</p><h1>{{title}}</h1><p>{{detail}}</p></div></header><PreviewBanner kind="proposed"/></div></template>
