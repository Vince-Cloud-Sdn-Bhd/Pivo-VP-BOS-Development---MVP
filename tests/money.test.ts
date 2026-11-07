import {describe,expect,it} from 'vitest'
import {fmtMoney,loanAmount,mulBpHalfUp,splitFeeInstalments,sumKnown} from '../src/lib/money'
describe('money',()=>{
  it('formats integer sen and unknown values',()=>{expect(fmtMoney(12345)).toBe('RM 123.45');expect(fmtMoney(null)).toBe('Unknown')})
  it('rounds a basis-point amount half up',()=>{expect(mulBpHalfUp(69480055,900)).toBe(6253205)})
  it('calculates the 10% PIVO fee examples',()=>{expect(mulBpHalfUp(5000000,1000)).toBe(500000);expect(mulBpHalfUp(3000000,1000)).toBe(300000)})
  it('splits instalments using cumulative targets',()=>{expect(splitFeeInstalments(500000,[3000000,2000000])).toEqual([300000,200000])})
  it('keeps unknown separate from zero',()=>{expect(sumKnown([0,null,100])).toEqual({total:100,unknownCount:1})})
  it('calculates loan amount',()=>expect(loanAmount(50000000,8000)).toBe(40000000))
})
