<script setup lang="ts">
import {useDb} from '../../../stores/db'
import {StatusBadge,AgeChip} from '../../../components/shared'
const db=useDb()
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Work assurance</p><h1>Tasks</h1><p>Owned work keeps its original due date, blockers, pauses and evidence.</p></div></header><section class="card table-scroll"><el-table :data="db.data.tasks"><el-table-column prop="title" label="Task" min-width="260"/><el-table-column prop="ownerUserId" label="Owner" min-width="140"/><el-table-column label="State" min-width="120"><template #default="{row}"><StatusBadge :label="row.state"/></template></el-table-column><el-table-column label="Age" min-width="240"><template #default><AgeChip :gross="14" :active="12" :overdue="3"/></template></el-table-column><el-table-column prop="dueAt" label="Due" min-width="190"/></el-table></section></div></template>
