<script setup lang="ts">
import {computed,ref} from 'vue'
import {useDb} from '../../../stores/db'
import {useSession} from '../../../stores/session'
import {StatusBadge,PreviewBanner} from '../../../components/shared'
import {fmtMoney} from '../../../lib/money'
import {transitionLoan} from '../../partner/domain'
const db=useDb(),session=useSession(),message=ref('')
const loans=computed(()=>db.data.loanApplications.filter(loan=>loan.bankOrgId===session.activePersona?.orgId))
function move(id:string,next:'assessing'|'conditional_offer'|'offer_accepted'|'disbursing'|'disbursed'){const loan=db.data.loanApplications.find(item=>item.id===id);if(!loan)return;try{transitionLoan(id,next,loan.version);message.value=`Application moved to ${next}.`}catch(e){message.value=e instanceof Error?e.message:''}}
</script>
<template><div class="page"><header class="page-header"><div><p class="eyebrow">Bank partner portal</p><h1>My applications</h1><p>Only applications assigned to your bank and organisation are visible.</p></div><StatusBadge :label="session.activePersona?.orgId||'Bank'"/></header><PreviewBanner/><p v-if="message" class="card">{{message}}</p><article v-for="loan in loans" :key="loan.id" class="card"><div class="actions" style="justify-content:space-between"><h2>{{loan.id}} · {{db.data.people.find(p=>p.id===loan.applicantPersonId)?.name}}</h2><StatusBadge :label="loan.stage"/></div><p>Unit A-12-03 · Owner {{loan.ownerUserId}} · Version {{loan.version}}</p><div v-if="loan.offer"><p>Offer {{fmtMoney(loan.offer.amountMinor)}} · valid to {{loan.offer.validUntil}}</p><p v-for="condition in loan.offer.conditions" :key="condition.text"><StatusBadge :label="condition.met?'Condition met':'Condition open'"/> {{condition.text}}</p></div><div class="actions"><el-button @click="move(loan.id,'assessing')">Assess</el-button><el-button @click="move(loan.id,'conditional_offer')">Record offer</el-button><el-button @click="move(loan.id,'offer_accepted')">Accept offer</el-button><el-button @click="move(loan.id,'disbursing')">Disburse</el-button><router-link to="/documents">Documents</router-link></div><p class="source-meta">No automatic credit lookup or bank API. Disbursement never triggers the PIVO fee.</p></article></div></template>
