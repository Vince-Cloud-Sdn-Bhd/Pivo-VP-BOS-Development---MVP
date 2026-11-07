import {describe,expect,it} from 'vitest'
import {monthlyMortgage} from '../src/lib/mortgage'
describe('mortgage estimate',()=>it('matches the prompt example',()=>expect(monthlyMortgage(45000000,4.2,360)).toBe(220058)))
