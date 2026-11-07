<script setup lang="ts">
import {useUi} from '../../../stores/ui'
import {StatusBadge} from '../../../components/shared'
const ui=useUi()
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Support</p><h1>Help</h1><p>Your primary PIC is Daniel; backup contact is Aisha.</p></div></header><section class="card"><h2>Frequently asked</h2><article class="data-row"><span>Does uploading a slip confirm payment?</span><StatusBadge label="No"/></article><article class="data-row"><span>Will PIVO ask for a password or OTP by message?</span><StatusBadge label="Never"/></article><el-button @click="ui.aiOpen=true">Ask PIVO assistant</el-button></section><section class="card"><h2>Preferences</h2><label><input type="checkbox" checked> Critical service notices</label><br><label><input type="checkbox"> Marketing messages</label></section></div></template>
