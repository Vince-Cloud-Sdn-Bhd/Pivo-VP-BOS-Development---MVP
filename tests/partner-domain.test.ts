import {beforeEach,describe,expect,it} from 'vitest'
import {createPinia,setActivePinia} from 'pinia'
import {useSession} from '../src/stores/session'
import {useDb} from '../src/stores/db'
import {confirmAppointment,transitionLoan,uploadDocument,reviewDocument} from '../src/modules/partner/domain'
beforeEach(()=>setActivePinia(createPinia()))
describe('partner commands',()=>{
  it('enforces bank isolation and valid loan transitions',()=>{
    useSession().switchPersona('u-bank-a');const loan=useDb().data.loanApplications.find(l=>l.id==='loan-a')!
    expect(()=>transitionLoan('loan-a','disbursed',loan.version)).toThrowError(/Cannot move/)
    transitionLoan('loan-a','offer_accepted',loan.version)
    useSession().switchPersona('u-bank-b');expect(()=>transitionLoan('loan-a','disbursing',loan.version+1)).toThrowError(/not found/)
  })
  it('keeps upload and acceptance separate and quarantines failed scans',()=>{
    useSession().switchPersona('u-p1');uploadDocument('doc-1','new.pdf');useSession().switchPersona('u-bank-a')
    expect(reviewDocument('doc-1',true).state).toBe('accepted')
    useSession().switchPersona('u-p1');uploadDocument('doc-1','bad.pdf');useSession().switchPersona('u-bank-a')
    expect(reviewDocument('doc-1',false).state).toBe('quarantined')
  })
  it('does not exceed appointment capacity',()=>{
    useSession().switchPersona('u-p1');confirmAppointment('slot-handover','a');expect(()=>confirmAppointment('slot-handover','b')).toThrowError(/taken/)
  })
})
