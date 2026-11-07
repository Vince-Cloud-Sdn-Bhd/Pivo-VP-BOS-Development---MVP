<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useSession} from '../../../stores/session'
import {StatusBadge} from '../../../components/shared'
type Badge='Working demo'|'Preview (proposed)'|'Future service'
interface Feature{name:string;description:string;to:string;status:Badge}
interface BosModule{name:string;summary:string;features:Feature[]}
const router=useRouter(),session=useSession()
const lifecycle=[
  {name:'Deal acquisition and structuring',department:'BD/SP',to:'/deals'},
  {name:'Project set-up and governance',department:'BD/SP',to:'/projects/project-sample?tab=setup'},
  {name:'Marketing support',department:'MKT',to:'/nexus?tab=campaigns'},
  {name:'Cross-agency arrangement',department:'BD/SP',to:'/projects/project-sample?tab=agency'},
  {name:'Pre-SPA signing',department:'SA',to:'/bookings'},
  {name:'Post-SPA signing',department:'CC',to:'/finance'},
  {name:'Pre-VP',department:'BD/SP + OPS',to:'/partner-work'},
  {name:'Post-VP',department:'OPS',to:'/future'},
]
const modules:BosModule[]=[
  {name:'Core',summary:'Projects, stock, agreements and platform administration.',features:[
    {name:'Projects',description:'Project setup, lifecycle and operating controls.',to:'/projects',status:'Working demo'},
    {name:'Inventory',description:'Floor grid, accessible unit table and availability.',to:'/projects/project-sample?tab=inventory',status:'Working demo'},
    {name:'Pricing and packages',description:'Price versions, quotation inputs and agency agreements.',to:'/projects/project-sample?tab=pricing',status:'Working demo'},
    {name:'Lifecycle tracker',description:'Eight-stage Project Lifecycle Framework activities.',to:'/projects/project-sample?tab=lifecycle',status:'Working demo'},
    {name:'Deals and JV',description:'Exclusive and developer-JV deal structures.',to:'/deals',status:'Working demo'},
    {name:'Landowner workspace',description:'Signed deal, consideration split and contra units.',to:'/jv',status:'Working demo'},
    {name:'Fund partner workspace',description:'Commitments, deployments and distributions kept distinct.',to:'/jv',status:'Working demo'},
    {name:'Admin and access control',description:'Users, partner access, roles and change control.',to:'/admin/users',status:'Working demo'},
  ]},
  {name:'Flow',summary:'The connected booking, partner and customer lifecycle.',features:[
    {name:'Holds and booking',description:'Guided hold, purchaser preparation and booking creation.',to:'/bookings/new?unit=unit-12-5',status:'Working demo'},
    {name:'Bookings and Case 360',description:'Independent financing, legal, delivery and payment lanes.',to:'/bookings/case-demo',status:'Working demo'},
    {name:'Approvals',description:'Maker-checker decisions and blocked work queue.',to:'/bookings/approvals',status:'Working demo'},
    {name:'Customer Success',description:'Stalled work, blockers, ageing and assurance.',to:'/cs',status:'Working demo'},
    {name:'Banker portal',description:'Bank-scoped loan applications and document review.',to:'/partner-work',status:'Working demo'},
    {name:'Lawyer portal',description:'Sale and loan matters with separate service clocks.',to:'/partner-work',status:'Working demo'},
    {name:'Documents',description:'Upload, scan, review, acceptance and revocation states.',to:'/documents',status:'Working demo'},
    {name:'Appointments',description:'Capacity-safe confirmation, attendance and handover evidence.',to:'/appointments',status:'Working demo'},
    {name:'Tasks',description:'Scoped work, blockers, owners and due dates.',to:'/tasks',status:'Working demo'},
    {name:'Developer portal',description:'Developer-confirmed sales and project delivery work.',to:'/partner-work',status:'Working demo'},
    {name:'Construction updates',description:'Report, approve and publish updates by block.',to:'/partner-work',status:'Working demo'},
    {name:'Handover',description:'Readiness, notice, appointment, keys and acknowledgements.',to:'/partner-work',status:'Working demo'},
    {name:'Purchaser portal',description:'Property, progress, payments, documents and help.',to:'/partner-work',status:'Working demo'},
    {name:'Agent workspace',description:'Allocated inventory and attributed Bookings only.',to:'/partner-work',status:'Working demo'},
  ]},
  {name:'Ledger',summary:'Money obligations, receipts, settlement and controls.',features:[
    {name:'Finance',description:'Finance command centre and separated queues.',to:'/finance?tab=queues',status:'Working demo'},
    {name:'Fees',description:'Fixed PIVO B2B fee, instalments and reversals.',to:'/finance?tab=fees',status:'Working demo'},
    {name:'Remittance',description:'Prepare, approve and execute with different users.',to:'/finance?tab=remittance',status:'Working demo'},
    {name:'Refunds',description:'Cancellation, verification, decision and external completion.',to:'/finance?tab=refunds',status:'Working demo'},
    {name:'Purchase bills',description:'Bills, receipts and verified allocations.',to:'/finance?tab=bills',status:'Working demo'},
    {name:'Reconciliation',description:'Expected, observed and unmatched money with owners.',to:'/finance?tab=reconciliation',status:'Working demo'},
    {name:'AutoCount',description:'Queue, send, post and reconcile accounting states.',to:'/finance?tab=accounting',status:'Preview (proposed)'},
  ]},
  {name:'Nexus',summary:'Marketing, integrations and connected partner routes.',features:[
    {name:'Campaigns and leads',description:'Funding, routing, funnel stages and conversion denominators.',to:'/nexus?tab=campaigns',status:'Preview (proposed)'},
    {name:'AIVO sync',description:'Versioned events, replay protection and sync freshness.',to:'/nexus?tab=aivo',status:'Preview (proposed)'},
    {name:'Partner adapters',description:'Manual, import and approved API connection routes.',to:'/nexus?tab=adapters',status:'Preview (proposed)'},
    {name:'Government and tax',description:'HIMS, MyInvois and SST evidence kept separate.',to:'/nexus?tab=government',status:'Preview (proposed)'},
    {name:'Messaging',description:'Delivery, failures, recovery tasks and preferences.',to:'/nexus?tab=messaging',status:'Preview (proposed)'},
    {name:'Financing tools',description:'Mortgage estimate and controlled credit-report access.',to:'/nexus?tab=tools',status:'Working demo'},
  ]},
  {name:'Insight',summary:'Decision support, reporting and operational control.',features:[
    {name:'Reports',description:'Saved views, source freshness and tracked exports.',to:'/reports',status:'Working demo'},
    {name:'Control room',description:'Distinct facts, exceptions, ageing and drill-through.',to:'/control-room',status:'Working demo'},
    {name:'Action register',description:'Open, done pending verify, and verified with evidence.',to:'/control-room#action-register',status:'Working demo'},
  ]},
  {name:'AI',summary:'Bounded assistance, performance learning and governance.',features:[
    {name:'PIVO assistant',description:'Sources, uncertainty, hand-off and prohibited authority.',to:'/assistant',status:'Preview (proposed)'},
    {name:'Scorecards and recognition',description:'Evidence-based measures, provisional samples and coaching.',to:'/scorecards',status:'Preview (proposed)'},
    {name:'Governance',description:'Audit, authority, retention, release and scope testing.',to:'/governance',status:'Working demo'},
    {name:'Future services',description:'Defects, renovation, rental and ownership transfer.',to:'/future',status:'Future service'},
  ]},
]
const portals=[
  ['Staff','Aisha','/product-map'],
  ['Developer','Demo Developer','/developer'],
  ['Banker','Bank A Officer','/banker'],
  ['Lawyer','Firm A Associate','/lawyer'],
  ['Agent','Demo Agent','/agent'],
  ['Purchaser','Purchaser One','/home'],
  ['Landowner','Landowner Contact','/jv'],
  ['Fund Partner','Fund Partner Contact','/jv'],
] as const
function openPortal(name:string,path:string){
  const persona=session.personas.find(item=>item.name===name)
  if(persona)session.switchPersona(persona.id)
  router.push(path)
}
function badgeTone(status:Badge){return status==='Working demo'?'success':status==='Preview (proposed)'?'warning':'info'}
</script>
<template><div class="product-map"><header class="page-header"><div><p class="eyebrow">Whole-system presentation</p><h1>PIVO Product Map</h1><p>One connected property lifecycle across internal staff, external partners and purchasers. Synthetic data only.</p></div><router-link class="demo-start" to="/demo/walkthrough">Start the guided demo</router-link></header>
<section class="card"><div class="section-heading"><div><p class="eyebrow">Project Lifecycle Framework</p><h2>Eight lifecycle stages</h2></div><router-link to="/demo">Open demo guide</router-link></div><div class="lifecycle-row"><router-link v-for="(stage,index) in lifecycle" :key="stage.name" :to="stage.to" class="lifecycle-stage" data-product-link><span>{{index+1}}</span><strong>{{stage.name}}</strong><small>{{stage.department}}</small></router-link></div></section>
<section class="module-section"><div class="section-heading"><div><p class="eyebrow">BOS capability map</p><h2>Six modules, one operating system</h2></div></div><div class="module-grid"><article v-for="module in modules" :key="module.name" class="card module-card"><header><h2>{{module.name}}</h2><p>{{module.summary}}</p></header><div class="feature-list"><router-link v-for="feature in module.features" :key="module.name+feature.name" :to="feature.to" class="feature-row" data-product-link><span><strong>{{feature.name}}</strong><small>{{feature.description}}</small></span><StatusBadge :label="feature.status" :tone="badgeTone(feature.status)"/></router-link></div></article></div></section>
<section class="card"><div class="section-heading"><div><p class="eyebrow">Persona entry points</p><h2>Portals by role</h2></div></div><div class="portal-strip"><article v-for="[label,persona,path] in portals" :key="label"><strong>{{label}}</strong><button type="button" data-role-link @click="openPortal(persona,path)">Open as this role</button></article></div></section>
</div></template>
<style scoped>
.product-map{display:grid;gap:24px}.demo-start{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:10px;background:var(--pivo-forest);color:var(--pivo-white);font-weight:700}.section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:16px}.section-heading h2{margin:4px 0}.lifecycle-row{display:grid;grid-template-columns:repeat(8,minmax(112px,1fr));gap:8px;overflow-x:auto;padding-bottom:10px}.lifecycle-stage{display:grid;gap:6px;min-height:150px;padding:12px;border:1px solid var(--pivo-border);border-radius:14px;background:linear-gradient(180deg,var(--pivo-white),#F1F8F4)}.lifecycle-stage>span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--pivo-mint);color:var(--pivo-deep-forest);font-weight:900}.lifecycle-stage strong{line-height:1.25;font-size:13px}.lifecycle-stage small,.feature-row small{color:var(--pivo-muted)}.module-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.module-card{display:flex;flex-direction:column;gap:16px}.module-card header{padding-bottom:14px;border-bottom:1px solid var(--pivo-border)}.module-card header p{margin:0;color:var(--pivo-muted)}.feature-list{display:grid;gap:8px}.feature-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:60px;padding:10px 12px;border:1px solid transparent;border-radius:11px;background:var(--pivo-ivory)}.feature-row:hover{border-color:var(--pivo-mint);background:#EEF8F3}.feature-row>span:first-child{display:grid;gap:2px;min-width:0}.feature-row strong{color:var(--pivo-deep-forest)}.portal-strip{display:grid;grid-template-columns:repeat(8,minmax(120px,1fr));gap:8px;overflow-x:auto;padding-bottom:8px}.portal-strip article{display:grid;gap:10px;min-height:100px;padding:12px;background:var(--pivo-deep-forest);border-radius:12px;color:var(--pivo-white)}.portal-strip button{min-height:44px;border:1px solid var(--pivo-mint);border-radius:10px;background:var(--pivo-mint);color:var(--pivo-deep-forest);font-weight:700;cursor:pointer}@media(max-width:1000px){.module-grid{grid-template-columns:1fr}}@media(max-width:720px){.section-heading{align-items:flex-start;flex-direction:column}.feature-row{align-items:flex-start;flex-direction:column}.demo-start{width:100%;justify-content:center}}
</style>
