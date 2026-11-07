<script setup lang="ts">
import {StatusBadge,ScreenState,KpiTile,MoneyText,Timeline,PreviewBanner} from '../../../components/shared'
import {useDb} from '../../../stores/db'
const db=useDb(),states=['loading','empty','blocked','stale','offline','denied'] as const
</script>
<template><div class="page"><h1>Shared component gallery</h1><PreviewBanner/><div class="actions"><StatusBadge label="Neutral"/><StatusBadge label="Info"/><StatusBadge label="Verified" tone="verified"/><StatusBadge label="Warning"/><StatusBadge label="Rejected"/><StatusBadge label="Unknown" tone="unknown"/></div><div class="card-grid"><ScreenState v-for="state in states" :key="state" :state="state"/></div><KpiTile label="Zero denominator" :numerator="0" :denominator="0"/><p>Unknown money: <MoneyText :value="null"/></p><Timeline :events="db.data.caseEvents"/></div></template>
