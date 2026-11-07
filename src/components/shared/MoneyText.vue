<script setup lang="ts">
import {fmtMoney} from '../../lib/money'
import type {Money} from '../../types'
defineProps<{value:Money}>()
</script>
<template><span :class="{'muted':value===null}">{{fmtMoney(value)}}</span></template>
