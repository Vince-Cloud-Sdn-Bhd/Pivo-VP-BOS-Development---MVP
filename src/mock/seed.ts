import type * as T from '../types'
const now='2026-11-09T10:00:00+08:00'
export const seedOrgs:T.Org[]=[
  {id:'org-platform',name:'PIVO Demo Platform',kind:'platform'},
  {id:'org-dev',name:'Demo Developer Sdn Bhd',kind:'developer'},
  {id:'org-agency',name:'Demo Agency (AIVO)',kind:'agency'},
  {id:'org-bank-a',name:'Demo Bank A',kind:'bank'},
  {id:'org-bank-b',name:'Demo Bank B',kind:'bank'},
  {id:'org-firm-a',name:'Demo Legal Firm A',kind:'law_firm'},
  {id:'org-firm-b',name:'Demo Legal Firm B',kind:'law_firm'},
  {id:'org-land',name:'Demo Landowner',kind:'landowner'},
  {id:'org-fund',name:'Demo Fund Partner',kind:'fund'},
]
export const seedPeople:T.Person[]=[
  {id:'person-p1',name:'Purchaser One',identityNo:'900101-14-1001',identityKind:'NRIC',email:'purchaser.one@example.com',phone:'012-000 1001'},
  {id:'person-p2',name:'Purchaser Two',identityNo:'900101-14-1002',identityKind:'NRIC',email:'purchaser.two@example.com'},
  {id:'person-p3',name:'Purchaser Three',identityNo:'900101-14-1003',identityKind:'NRIC',email:'purchaser.three@example.com'},
]
export const seedPersonas:T.Persona[]=[
  {id:'u-aisha',name:'Aisha',title:'Superadmin',orgId:'org-platform',roles:['admin'],activeRole:'admin'},
  {id:'u-aisha2',name:'Aisha 2',title:'Second Superadmin',orgId:'org-platform',roles:['admin'],activeRole:'admin'},
  {id:'u-daniel',name:'Daniel',title:'Customer Success',orgId:'org-platform',roles:['coordinator'],activeRole:'coordinator'},
  {id:'u-mei',name:'Mei',title:'Finance Preparer',orgId:'org-platform',roles:['finance_preparer'],activeRole:'finance_preparer'},
  {id:'u-raj',name:'Raj',title:'Finance Approver',orgId:'org-platform',roles:['finance_approver'],activeRole:'finance_approver'},
  {id:'u-sofia',name:'Sofia',title:'Finance Executor',orgId:'org-platform',roles:['finance_executor'],activeRole:'finance_executor'},
  {id:'u-hana',name:'Hana',title:'Leadership',orgId:'org-platform',roles:['leadership'],activeRole:'leadership'},
  {id:'u-omar',name:'Omar',title:'Relationship Manager',orgId:'org-platform',roles:['relationship_manager'],activeRole:'relationship_manager'},
  {id:'u-dev',name:'Demo Developer',title:'Developer Operations',orgId:'org-dev',roles:['developer'],activeRole:'developer'},
  {id:'u-agent',name:'Demo Agent',title:'Agent',orgId:'org-agency',roles:['agent'],activeRole:'agent'},
  {id:'u-bank-a',name:'Bank A Officer',title:'Bank Officer',orgId:'org-bank-a',roles:['banker'],activeRole:'banker'},
  {id:'u-bank-b',name:'Bank B Officer',title:'Bank Officer',orgId:'org-bank-b',roles:['banker'],activeRole:'banker'},
  {id:'u-firm-a',name:'Firm A Associate',title:'Legal Associate',orgId:'org-firm-a',roles:['lawyer'],activeRole:'lawyer'},
  {id:'u-firm-b',name:'Firm B Associate',title:'Legal Associate',orgId:'org-firm-b',roles:['lawyer'],activeRole:'lawyer'},
  {id:'u-p1',name:'Purchaser One',title:'Primary Purchaser',orgId:'org-platform',roles:['purchaser'],activeRole:'purchaser',personId:'person-p1'},
  {id:'u-p2',name:'Purchaser Two',title:'Joint Purchaser',orgId:'org-platform',roles:['purchaser'],activeRole:'purchaser',personId:'person-p2'},
  {id:'u-p3',name:'Purchaser Three',title:'Purchaser',orgId:'org-platform',roles:['purchaser'],activeRole:'purchaser',personId:'person-p3'},
  {id:'u-land',name:'Landowner Contact',title:'Landowner',orgId:'org-land',roles:['landowner'],activeRole:'landowner'},
  {id:'u-fund',name:'Fund Partner Contact',title:'Fund Partner',orgId:'org-fund',roles:['fund_partner'],activeRole:'fund_partner'},
]
export function createSeed(){
  const assignments:T.Assignment[]=[
    ...seedPersonas.filter(p=>p.orgId==='org-platform').map((p,index)=>({id:`asg-staff-${index}`,userId:p.id,orgId:p.orgId,scopeType:'project' as const,scopeId:'project-sample',role:p.activeRole,from:'2026-01-01T00:00:00+08:00'})),
    {id:'asg-agent',userId:'u-agent',orgId:'org-agency',scopeType:'project',scopeId:'project-sample',role:'agent',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-bank-a',userId:'u-bank-a',orgId:'org-bank-a',scopeType:'loan_application',scopeId:'loan-a',role:'banker',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-bank-b',userId:'u-bank-b',orgId:'org-bank-b',scopeType:'loan_application',scopeId:'loan-b',role:'banker',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-firm-a',userId:'u-firm-a',orgId:'org-firm-a',scopeType:'legal_matter',scopeId:'matter-sale',role:'lawyer',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-firm-b',userId:'u-firm-b',orgId:'org-firm-b',scopeType:'legal_matter',scopeId:'matter-loan',role:'lawyer',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-p1',userId:'u-p1',orgId:'org-platform',scopeType:'case',scopeId:'case-demo',role:'purchaser',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-p2',userId:'u-p2',orgId:'org-platform',scopeType:'case',scopeId:'case-demo',role:'purchaser',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-p3',userId:'u-p3',orgId:'org-platform',scopeType:'case',scopeId:'case-three',role:'purchaser',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-land',userId:'u-land',orgId:'org-land',scopeType:'deal',scopeId:'deal-jv',role:'landowner',from:'2026-01-01T00:00:00+08:00'},
    {id:'asg-fund',userId:'u-fund',orgId:'org-fund',scopeType:'holding',scopeId:'holding-jv',role:'fund_partner',from:'2026-01-01T00:00:00+08:00'},
  ]
  const blocks:T.Block[]=[{id:'block-a',name:'Block A',floors:20},{id:'block-b',name:'Block B',floors:20}]
  const projects:T.Project[]=[{id:'project-sample',name:'Sample Residences (Demo)',developerOrgId:'org-dev',mode:'exclusive',status:'selling',blocks,holdPolicy:{minutes:120,policyVersion:'v1'},bookingFeePolicyMinor:100000,paymentChannels:{A:false,B:true},payeeName:'Demo Payee Sdn Bhd'},{id:'project-jv',name:'Demo JV Towers',developerOrgId:'org-dev',mode:'developer_jv',status:'setup',blocks:[{id:'block-jv',name:'Tower A',floors:12}],holdPolicy:{minutes:120,policyVersion:'v1'},bookingFeePolicyMinor:200000,paymentChannels:{A:false,B:true},payeeName:'Demo JV Payee'}]
  const layouts:T.LayoutVersion[]=[{id:'layout-a',projectId:'project-sample',code:'Type A',kind:'contracted',areaSqft:980,version:2},{id:'layout-b',projectId:'project-sample',code:'Type B',kind:'marketing',areaSqft:1280,version:1}]
  const prices:T.PriceVersion[]=[{id:'price-v2',projectId:'project-sample',packageName:'Launch package',version:2,effectiveFrom:'2026-10-01T00:00:00+08:00',status:'approved',discountMinor:1000000,bookingDepositMinor:500000,buyerChargesMinor:450000}]
  const units:T.Unit[]=[]
  for(let floor=10;floor<=12;floor++)for(let index=1;index<=6;index++){const id=`unit-${floor}-${index}`;units.push({id,projectId:'project-sample',blockId:floor===12&&index>3?'block-b':'block-a',floor,unitNo:`A-${floor}-${String(index).padStart(2,'0')}`,layoutId:index<4?'layout-a':'layout-b',areaSqft:index<4?980:1280,listPriceMinor:50000000+floor*100000+index*250000,priceVersionId:'price-v2',status:id==='unit-12-3'?'reserved':id==='unit-jv'?'blocked':'available',version:1,allocatedAgencyIds:['org-agency'],updatedAt:'2026-11-08T16:00:00+08:00'})}
  units.push({id:'unit-three',projectId:'project-sample',blockId:'block-a',floor:11,unitNo:'A-11-03',layoutId:'layout-a',areaSqft:980,listPriceMinor:49000000,priceVersionId:'price-v2',status:'booked',version:1,allocatedAgencyIds:['org-agency'],updatedAt:now})
  const caseRows:T.Case[]=[
    {id:'case-demo',bookingId:'booking-demo',projectId:'project-sample',unitId:'unit-12-3',summary:'Hero lifecycle case',openBlockers:1},
    {id:'case-three',bookingId:'booking-three',projectId:'project-sample',unitId:'unit-three',summary:'Purchaser Three case',openBlockers:0},
  ]
  const bookings:T.Booking[]=[
    {id:'booking-demo',caseId:'case-demo',unitId:'unit-12-3',projectId:'project-sample',status:'BOOKED',priceSnapshot:{listPriceMinor:50500000,priceVersionId:'price-v2',layoutId:'layout-a',lockedAt:'2026-10-20T10:00:00+08:00'},bookingFee:{policyMinor:100000,agreedMinor:100000,payment:'verified',channel:'B',recordedBy:'u-mei',verifiedBy:'u-raj'},parties:[{personId:'person-p1',role:'primary',from:'2026-10-20T10:00:00+08:00',verified:true},{personId:'person-p2',role:'joint',from:'2026-10-20T10:00:00+08:00',verified:true}],agentOrgId:'org-agency',agentUserId:'u-agent',requestKey:'demo-booking',version:3,createdAt:'2026-10-20T10:00:00+08:00'},
    {id:'booking-three',caseId:'case-three',unitId:'unit-three',projectId:'project-sample',status:'BOOKED',priceSnapshot:{listPriceMinor:49000000,priceVersionId:'price-v2',layoutId:'layout-a',lockedAt:'2026-10-22T10:00:00+08:00'},bookingFee:{policyMinor:100000,agreedMinor:100000,payment:'verified',channel:'B'},parties:[{personId:'person-p3',role:'primary',from:'2026-10-22T10:00:00+08:00',verified:true}],requestKey:'three-booking',version:1,createdAt:'2026-10-22T10:00:00+08:00'},
  ]
  const holds:T.Hold[]=[{id:'hold-active',unitId:'unit-12-4',byUserId:'u-agent',requestKey:'hold-demo',state:'active',createdAt:'2026-11-09T09:30:00+08:00',expiresAt:'2026-11-09T11:30:00+08:00',policyVersion:'v1',paymentState:'none'}]
  const loanApplications:T.LoanApplication[]=[{id:'loan-a',caseId:'case-demo',bankOrgId:'org-bank-a',applicantPersonId:'person-p1',stage:'conditional_offer',offer:{amountMinor:40000000,validUntil:'2026-11-20T18:00:00+08:00',conditions:[{text:'Signed letter of offer',met:false},{text:'Latest payslip',met:true}],version:1},ownerUserId:'u-bank-a',version:2},{id:'loan-b',caseId:'case-demo',bankOrgId:'org-bank-b',applicantPersonId:'person-p1',stage:'rejected',ownerUserId:'u-bank-b',version:2}]
  const legalMatters:T.LegalMatter[]=[{id:'matter-sale',caseId:'case-demo',firmOrgId:'org-firm-a',kind:'sale',stage:'preparing',clock:{instructionIssuedAt:'2026-11-06T10:00:00+08:00',deliveredAt:'2026-11-06T11:00:00+08:00',acknowledgedAt:'2026-11-07T10:00:00+08:00'},ownerUserId:'u-firm-a',version:1},{id:'matter-loan',caseId:'case-demo',firmOrgId:'org-firm-b',kind:'loan',stage:'instructed',clock:{instructionIssuedAt:'2026-11-07T10:00:00+08:00'},ownerUserId:'u-firm-b',version:1}]
  const documents:T.DocumentRequest[]=[{id:'doc-1',scopeType:'loan_application',scopeId:'loan-a',applicantPersonId:'person-p1',requestingOrgId:'org-bank-a',purpose:'Loan assessment',dueAt:'2026-11-10T17:00:00+08:00',reviewerUserId:'u-bank-a',state:'rejected',versions:[{id:'dv-1',fileName:'payslip.pdf',uploadedAt:'2026-11-07T14:00:00+08:00',byUserId:'u-p1',scan:'clean'}],rejectionReason:'Payslip was incomplete'}]
  const tasks:T.Task[]=[
    {id:'task-1',caseId:'case-demo',scopeType:'loan_application',scopeId:'loan-a',title:'Obtain signed letter of offer',ownerUserId:'u-bank-a',backupUserId:'u-daniel',dueAt:'2026-11-10T17:00:00+08:00',originalDueAt:'2026-11-10T17:00:00+08:00',state:'open',enteredAt:'2026-11-07T09:00:00+08:00',pauses:[]},
    {id:'task-2',caseId:'case-demo',scopeType:'legal_matter',scopeId:'matter-sale',title:'Confirm SPA signing window',ownerUserId:undefined,dueAt:'2026-11-12T17:00:00+08:00',originalDueAt:'2026-11-12T17:00:00+08:00',state:'blocked',enteredAt:'2026-11-05T09:00:00+08:00',blocker:{cause:'Waiting for developer instruction',dependencyOwner:'Demo Developer',nextReviewAt:'2026-11-10T09:00:00+08:00',audience:'internal'},pauses:[]},
  ]
  const caseEvents:T.CaseEvent[]=[{id:'event-closed',caseId:'case-demo',scopeType:'document',scopeId:'doc-1',kind:'state',actorUserId:'u-p1',source:'Document portal',prevState:'requested',nextState:'rejected',reason:'Resubmission required',evidenceIds:['dv-1'],occurredAt:'2026-10-11T10:00:00+08:00',recordedAt:'2026-10-11T10:10:00+08:00'},{id:'event-new',caseId:'case-demo',scopeType:'task',scopeId:'task-1',kind:'note',actorUserId:'u-daniel',source:'Customer Success',nextState:'Waiting for bank review',reason:'Latest application version is with Bank A',evidenceIds:[],occurredAt:'2026-11-08T11:00:00+08:00',recordedAt:'2026-11-08T11:05:00+08:00'}]
  const slots:T.Slot[]=[{id:'slot-spa',resourceId:'signing-room-a',start:'2026-11-14T10:00:00+08:00',end:'2026-11-14T11:00:00+08:00',capacity:2,taken:0},{id:'slot-handover',resourceId:'handover-desk',start:'2026-12-15T09:00:00+08:00',end:'2026-12-15T10:00:00+08:00',capacity:1,taken:0}]
  const appointments:T.Appointment[]=[{id:'appt-1',caseId:'case-demo',kind:'spa_signing',slotId:'slot-spa',state:'invited',version:1,requestKey:'appt-demo',originalStart:'2026-11-14T10:00:00+08:00'}]
  const constructionUpdates:T.ConstructionUpdate[]=[{id:'construction-a',projectId:'project-sample',blockId:'block-a',stage:'Structural frame',weightPct:42.5,state:'reported_complete',reportedAt:'2026-11-01T10:00:00+08:00',evidenceIds:['doc-a'],published:true,publishedAt:'2026-11-02T10:00:00+08:00',approvedBy:'u-dev',version:2,nextExpectedAt:'2026-12-01T10:00:00+08:00'},{id:'construction-b',projectId:'project-sample',blockId:'block-b',stage:'Foundation',weightPct:20,state:'forecast',reportedAt:'2026-11-01T10:00:00+08:00',evidenceIds:[],published:false,version:1}]
  const handovers:T.HandoverRecord[]=[{id:'handover-demo',caseId:'case-demo',clearances:[{name:'Vacant possession notice',done:true},{name:'Final utility meter reading',done:false}],openIssues:['Touch-up in bathroom']}]
  const obligations:T.Obligation[]=[{id:'ob-fee',caseId:'case-demo',kind:'pivo_fee',agreement:{agreementId:'agreement-agency',version:1},approvedBaseMinor:5000000,rateBp:1000,approvedMinor:500000,state:'partially_settled',eventKey:'fee-base'},{id:'ob-remit',caseId:'case-demo',kind:'booking_fee_remit',agreement:{agreementId:'agreement-agency',version:1},approvedBaseMinor:100000,approvedMinor:100000,state:'approved',eventKey:'remit-demo'}]
  const feeEntries:T.FeeEntry[]=[{id:'fee-post-1',obligationId:'ob-fee',kind:'post',baseMinor:3000000,feeMinor:300000,authorityUserId:'u-raj',ruleVersion:'v1',postedAt:'2026-11-05T10:00:00+08:00'}]
  const payments:T.Payment[]=[{id:'payment-bank',caseId:'case-demo',direction:'in',providerRef:'BANK-40000',amountMinor:4000000,state:'allocated',evidenceIds:['evidence-bank']},{id:'payment-cash',caseId:'case-demo',direction:'in',providerRef:'PURCHASER-5000',amountMinor:500000,state:'allocated',evidenceIds:['evidence-cash']},{id:'payment-unknown',caseId:'case-demo',direction:'in',providerRef:'UNKNOWN-1',amountMinor:0,state:'unknown',evidenceIds:[]}]
  const bills:T.PurchaseBill[]=[{id:'bill-demo',caseId:'case-demo',label:'Progress payment',amountMinor:5000000,dueAt:'2026-11-15T17:00:00+08:00',sourceDocId:'doc-bill'}]
  const allocations:T.Allocation[]=[{id:'alloc-bank',billId:'bill-demo',paymentId:'payment-bank',source:'bank',amountMinor:4000000,verified:true},{id:'alloc-cash',billId:'bill-demo',paymentId:'payment-cash',source:'purchaser',amountMinor:500000,verified:true}]
  const remittances:T.Remittance[]=[{id:'remit-1',caseId:'case-demo',payee:{name:'Demo Developer Sdn Bhd',accountMasked:'**** 8899',verifiedAt:'2026-11-05T10:00:00+08:00',changedAfterApproval:false},amountMinor:100000,preparedBy:'u-mei',approvedBy:'u-raj',state:'approved',idempotencyKey:'remit-demo'}]
  const refunds:T.RefundRequest[]=[{id:'refund-demo',caseId:'case-demo',reason:'Duplicate booking fee',paymentRefs:['payment-cash'],state:'requested',entitlementMinor:100000,deductionsMinor:0,cumulativeLimitMinor:100000,priorRefundsMinor:0}]
  const deals:T.LandDeal[]=[{id:'deal-jv',projectId:'project-jv',landownerOrgId:'org-land',version:1,totalMinor:1000000000,cashBp:3000,progressiveBp:5000,contraBp:2000,milestones:[{id:'land-ms-1',trigger:'Signing',dueAt:'2026-10-01T10:00:00+08:00',amountMinor:300000000,state:'paid_confirmed',evidenceId:'land-evidence'}],contraUnitIds:['unit-jv'],rmUserId:'u-omar'}]
  const funds:T.FundCommitment[]=[{id:'holding-jv',investorOrgId:'org-fund',projectId:'project-jv',agreementVersion:1,committedMinor:500000000,calledMinor:200000000,deployedMinor:150000000,projectedProfitMinor:80000000,declaredDistributionMinor:0,paidDistributionMinor:0,useOfFunds:[{category:'Construction',amountMinor:150000000}]}]
  const campaigns:T.Campaign[]=[{id:'campaign-1',projectId:'project-sample',name:'Launch campaign',funding:'pivo',postedFundingMinor:1000000,pendingDepositMinor:0,commitmentsMinor:0,spendMinor:250000,creditsMinor:0,chargesMinor:0,refundsMinor:0,state:'live'}]
  const leads:T.Lead[]=[{id:'lead-1',campaignId:'campaign-1',stage:'qualified',ownerAgentUserId:'u-agent',routedReason:'Project and language match',capturedAt:'2026-11-03T10:00:00+08:00'},{id:'lead-2',campaignId:'campaign-1',stage:'appointment_booked',ownerAgentUserId:'u-agent',routedReason:'Capacity match',capturedAt:'2026-11-04T10:00:00+08:00'},{id:'lead-3',campaignId:'campaign-1',stage:'attended',ownerAgentUserId:'u-agent',routedReason:'Capacity match',capturedAt:'2026-11-05T10:00:00+08:00'}]
  const actionItems:T.ActionItem[]=[{id:'action-1',headline:'Recover stalled SPA acknowledgement',decision:'Call Firm A and record evidence',ownerRole:'coordinator',dueAt:'2026-11-10T17:00:00+08:00',state:'open'}]
  const syncStatuses:T.SyncStatus[]=[{id:'sync-aivo',partner:'AIVO',state:'connected',lastSuccessAt:'2026-11-09T09:45:00+08:00',pendingCount:0},{id:'sync-autocount',partner:'AutoCount',state:'manual_only',pendingCount:2},{id:'sync-bank',partner:'Bank',state:'not_configured',pendingCount:0}]
  const notifications:T.Notification[]=[{id:'note-1',toUserId:'u-daniel',kind:'Blocked task requires action',critical:true,state:'sent',caseId:'case-demo',createdAt:'2026-11-09T09:00:00+08:00'}]
  const auditEntries:T.AuditEntry[]=[{id:'audit-1',actorUserId:'u-raj',actingAsRole:'finance_approver',action:'PAYMENT_VERIFIED',target:'payment-bank',at:'2026-11-08T10:00:00+08:00',detail:'Bank evidence matched'}]
  return {meta:{now},orgs:seedOrgs,people:seedPeople,personas:seedPersonas,assignments,projects,layouts,prices,units,agencyAgreements:[{id:'agreement-agency',orgId:'org-agency',projectId:'project-sample',version:1,dealCommissionBp:1000,eligibleBase:'net_price' as const,effectiveFrom:'2026-01-01T00:00:00+08:00',holdLimit:2,pricingVisible:true}],holds,bookings,cases:caseRows,loanApplications,legalMatters,documents,sharingGrants:[],tasks,caseEvents,slots,appointments,constructionUpdates,handovers,obligations,feeEntries,payments,bills,allocations,remittances,refunds,deals,funds,campaigns,leads,actionItems,syncStatuses,notifications,auditEntries}
}
export type Seed=ReturnType<typeof createSeed>
