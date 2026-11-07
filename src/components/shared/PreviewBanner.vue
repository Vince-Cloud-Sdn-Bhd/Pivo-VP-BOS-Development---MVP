<script setup lang="ts">withDefaults(defineProps<{kind?:'proposed'|'future'}>(),{kind:'proposed'})</script>
<template><div class="preview-banner">{{kind==='future'?'FUTURE SERVICE / SEPARATE SCOPE':'PROPOSED DESIGN / SUBJECT TO G0 APPROVAL'}}</div></template>
