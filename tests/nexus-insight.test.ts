import {beforeEach,describe,expect,it} from 'vitest'
import {createPinia,setActivePinia} from 'pinia'
import {appointmentOutcome,replayEvent} from '../src/modules/nexus/domain'
beforeEach(()=>setActivePinia(createPinia()))
describe('Nexus and Insight',()=>{
  it('deduplicates replays and ignores older events',()=>{
    expect(replayEvent({eventId:'e1',aggregateVersion:6,recordId:'b'}).result).toContain('accepted')
    expect(replayEvent({eventId:'e1',aggregateVersion:6,recordId:'b'}).duplicate).toBe(true)
    expect(replayEvent({eventId:'old',aggregateVersion:4,recordId:'b'}).ignored).toBe(true)
  })
  it('reconciles appointment outcomes',()=>{const result=appointmentOutcome();expect(result.attended+result.noShow+result.notVerified).toBe(result.confirmedDue);expect(result.rate).toBeCloseTo(5/12)})
})
