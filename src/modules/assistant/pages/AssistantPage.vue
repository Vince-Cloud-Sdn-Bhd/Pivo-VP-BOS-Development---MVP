<script setup lang="ts">
import {useUi} from '../../../stores/ui'
import {StatusBadge,PreviewBanner} from '../../../components/shared'
const ui=useUi()
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Bounded assistance</p><h1>PIVO Assistant</h1><p>Deterministic demo assistant with sources, uncertainty and human hand-off.</p></div><StatusBadge label="Preview (proposed)" tone="warning"/></header><PreviewBanner/><section class="card"><h2>What it can demonstrate</h2><div class="data-list"><article class="data-row"><span>Explain an owned next action with record sources</span><StatusBadge label="Tier 1"/></article><article class="data-row"><span>Refuse loan approval and refund payment</span><StatusBadge label="Tier 4"/></article><article class="data-row"><span>Flag prompt-injection text as untrusted</span><StatusBadge label="Safe"/></article></div><el-button type="primary" @click="ui.aiOpen=true">Open assistant drawer</el-button></section></div></template>
