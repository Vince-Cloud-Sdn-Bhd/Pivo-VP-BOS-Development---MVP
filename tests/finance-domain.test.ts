import {beforeEach,describe,expect,it} from 'vitest'
import {createPinia,setActivePinia} from 'pinia'
import {useSession} from '../src/stores/session'
import {useDb} from '../src/stores/db'
import {approveRemittance,campaignAvailable,campaignSplit,executeRemittance,markPaid,postFeeInstalment,prepareRemittance,reverseFee,suspendRemittanceForPayeeChange} from '../src/modules/finance/domain'
beforeEach(()=>setActivePinia(createPinia()))
describe('finance commands',()=>{
  it('enforces three-person remittance authority',()=>{
    useDb().data.remittances[0].state='prepared'
    useSession().switchPersona('u-mei');prepareRemittance()
    useSession().switchPersona('u-raj');useDb().data.remittances[0].preparedBy='u-raj';expect(()=>approveRemittance()).toThrowError(/Preparer/);useDb().data.remittances[0].preparedBy='u-mei'
    useSession().switchPersona('u-mei');expect(()=>approveRemittance()).toThrowError()
    useSession().switchPersona('u-raj');approveRemittance();useSession().switchPersona('u-sofia');expect(executeRemittance().state).toBe('executed')
  })
  it('deduplicates fee instalments and supports linked reversals',()=>{
    useSession().switchPersona('u-raj');const first=postFeeInstalment(2000000,200000,'same');expect(postFeeInstalment(2000000,200000,'same').id).toBe(first.id)
    reverseFee(first.id,1000000,100000,'partial');expect(useDb().data.feeEntries.at(-1)?.feeMinor).toBe(-100000)
  })
  it('suspends approval when payee changes and requires evidence to mark paid',()=>{
    useSession().switchPersona('u-raj');suspendRemittanceForPayeeChange();expect(useDb().data.remittances[0].approvedBy).toBeUndefined();expect(()=>markPaid(false)).toThrowError(/evidence/)
  })
  it('calculates both campaign fee orders',()=>{
    expect(campaignSplit(1000000,false)).toMatchObject({lead:500000,leader:350000,investor:150000})
    expect(campaignSplit(1000000,true)).toMatchObject({aivoFee:100000,lead:450000,leader:315000,investor:135000})
  })
  it('returns available campaign funds without counting pending deposits',()=>expect(campaignAvailable({postedFundingMinor:1000000,creditsMinor:100000,spendMinor:250000,chargesMinor:0,refundsMinor:0,commitmentsMinor:0})).toBe(850000))
})
