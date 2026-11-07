import {describe,expect,it} from 'vitest'
import {addBusinessHours,businessHoursBetween} from '../src/lib/businessTime'
describe('business time',()=>{
  it('counts weekday working hours only',()=>expect(businessHoursBetween('2026-11-06T01:00:00.000Z','2026-11-06T04:00:00.000Z')).toBe(3))
  it('continues into the next business day',()=>expect(addBusinessHours('2026-11-09T01:00:00.000Z',10)).toBe('2026-11-10T02:00:00.000Z'))
})
