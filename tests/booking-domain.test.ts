import {beforeEach,describe,expect,it} from 'vitest'
import {createPinia,setActivePinia} from 'pinia'
import {placeHold,createBooking,requestFeeVariance,approveFeeVariance,recordBookingPayment,verifyBookingPayment,markBooked,markSold} from '../src/modules/booking/domain'
import {useSession} from '../src/stores/session'
import {useDb} from '../src/stores/db'
import {DomainError} from '../src/lib/errors'
beforeEach(()=>{setActivePinia(createPinia());useSession().switchPersona('u-agent')})
describe('booking commands',()=>{
  it('returns the same hold for the same request key and conflicts for a competing request',()=>{
    const db=useDb(),unit=db.data.units.find(u=>u.id==='unit-12-5')!
    const first=placeHold(unit.id,unit.version,'same-key')
    expect(placeHold(unit.id,unit.version,'same-key').id).toBe(first.id)
    expect(()=>placeHold(unit.id,unit.version,'other-key')).toThrowError(DomainError)
  })
  it('creates a booking with locked snapshot and protects fee verification',()=>{
    const db=useDb(),unit=db.data.units.find(u=>u.id==='unit-12-5')!,hold=placeHold(unit.id,unit.version,'booking-hold')
    const booking=createBooking({holdId:hold.id,purchasers:[{name:'Demo Buyer',email:'demo@example.com',identityNo:'900101-14-0000',role:'primary'}],requestKey:'booking-key'})
    expect(booking.priceSnapshot.listPriceMinor).toBe(unit.listPriceMinor)
    useSession().switchPersona('u-aisha');requestFeeVariance(booking.id,120000,'Approved exception')
    expect(()=>approveFeeVariance(booking.id)).toThrowError(/different Superadmin/)
    useSession().switchPersona('u-aisha2');approveFeeVariance(booking.id)
    useSession().switchPersona('u-mei');recordBookingPayment(booking.id,'B')
    expect(()=>verifyBookingPayment(booking.id)).toThrowError(/recorder/)
    useSession().switchPersona('u-raj');verifyBookingPayment(booking.id)
    useSession().switchPersona('u-aisha');expect(markBooked(booking.id).status).toBe('BOOKED')
    expect(markSold(booking.id,8000).sold?.loanMinor).toBe(Math.floor((booking.priceSnapshot.listPriceMinor!*8000+5000)/10000))
  })
})
