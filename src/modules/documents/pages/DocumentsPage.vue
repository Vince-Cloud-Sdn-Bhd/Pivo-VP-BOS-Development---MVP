<script setup lang="ts">
import {computed,ref} from 'vue'
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {StatusBadge,FilePicker} from '../../../components/shared'
import {uploadDocument,reviewDocument} from '../../partner/domain'
const db=useDb(),session=useSession(),selected=ref<File|null>(null),message=ref('')
const documents=computed(()=>db.data.documents.filter(doc=>session.activePersona?.activeRole==='admin'||doc.applicantPersonId===session.activePersona?.personId||doc.requestingOrgId===session.activePersona?.orgId))
function upload(doc:{id:string}){if(!selected.value)return;try{uploadDocument(doc.id,selected.value.name);message.value='Uploaded. Scan is pending; this is not acceptance.'}catch(e){message.value=String(e)}}
function review(doc:{id:string},accept:boolean){try{reviewDocument(doc.id,accept);message.value=accept?'Document accepted by reviewer.':'Document quarantined.'}catch(e){message.value=String(e)}}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Scoped evidence</p><h1>Documents</h1><p>Upload, scan, review and acceptance are separate states. Revoked links fail closed.</p></div></header><p v-if="message" class="card">{{message}}</p><FilePicker @selected="selected=$event"/><div class="card-grid"><article v-for="doc in documents" :key="doc.id" class="card"><div class="actions" style="justify-content:space-between"><h3>{{doc.purpose}}</h3><StatusBadge :label="doc.state"/></div><p class="source-meta">{{doc.versions.at(-1)?.fileName||'No file uploaded'}} · scan {{doc.versions.at(-1)?.scan||'not started'}}</p><div class="actions"><el-button :disabled="!selected" @click="upload(doc)">Upload selected file</el-button><el-button v-if="session.activePersona?.activeRole==='banker'||session.activePersona?.activeRole==='lawyer'" @click="review(doc,true)">Accept</el-button><el-button v-if="session.activePersona?.activeRole==='banker'||session.activePersona?.activeRole==='lawyer'" @click="review(doc,false)">Quarantine</el-button></div></article></div></div></template>
