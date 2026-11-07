<script setup lang="ts">
import {computed,ref} from 'vue'
import {useRouter} from 'vue-router'
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {StatusBadge} from '../../../components/shared'
import {createProject} from '../domain'
const db=useDb(),session=useSession(),router=useRouter(),query=ref(''),mode=ref('')
const canCreate=computed(()=>session.activePersona?.activeRole==='admin')
const projects=computed(()=>db.data.projects.filter(project=>(!mode.value||project.mode===mode.value)&&project.name.toLowerCase().includes(query.value.toLowerCase())))
function create(){const name=window.prompt('Project name');if(!name)return;const project=createProject(name,`P${db.data.projects.length+1}`);router.push(`/projects/${project.id}`)}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Inventory and launch</p><h1>Projects</h1><p>Exclusive and developer-JV projects with lifecycle, inventory and commercial controls.</p></div><el-button v-if="canCreate" type="primary" @click="create">Create project</el-button></header><div class="card filter-bar"><label>Search<input v-model="query" placeholder="Project name"></label><label>Mode<select v-model="mode"><option value="">All modes</option><option value="exclusive">Exclusive</option><option value="developer_jv">Developer-JV</option></select></label></div><div class="card-grid"><router-link v-for="project in projects" :key="project.id" :to="`/projects/${project.id}`" class="card"><div class="actions" style="justify-content:space-between"><StatusBadge :label="project.mode==='exclusive'?'Exclusive':'Developer-JV'"/><StatusBadge :label="project.status"/></div><h2>{{project.name}}</h2><p class="muted">{{project.blocks.length}} blocks · {{db.data.units.filter(u=>u.projectId===project.id).length}} units</p><span>Open project →</span></router-link></div></div>
</template>
