<script setup lang="ts">
import {useDb} from '../../../stores/db'
import {StatusBadge} from '../../../components/shared'
const db=useDb()
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Maker-checker</p><h1>Approvals</h1><p>Decisions name the authority, reason, evidence and consequences.</p></div></header><section class="card table-scroll"><el-table :data="db.data.tasks.filter(t=>t.state==='blocked')"><el-table-column prop="title" label="Item" min-width="240"/><el-table-column prop="ownerUserId" label="Owner" min-width="140"/><el-table-column label="Authority" min-width="160"><template #default>Operation lead</template></el-table-column><el-table-column label="State" min-width="120"><template #default="{row}"><StatusBadge :label="row.state"/></template></el-table-column></el-table></section></div></template>
