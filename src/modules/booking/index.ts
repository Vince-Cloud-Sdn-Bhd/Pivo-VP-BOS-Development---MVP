import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import BookingsPage from './pages/BookingsPage.vue'
import BookingWizard from './pages/BookingWizard.vue'
import CaseDetail from './pages/CaseDetail.vue'
import ApprovalsPage from './pages/ApprovalsPage.vue'
const bookingRoles=['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer','agent','relationship_manager'] as const
export const routes:RouteRecordRaw[]=[{path:'/bookings',component:BookingsPage,meta:{roles:bookingRoles,title:'Bookings'}},{path:'/bookings/new',component:BookingWizard,meta:{roles:['admin','coordinator','agent','relationship_manager'],title:'Create booking'}},{path:'/bookings/approvals',component:ApprovalsPage,meta:{roles:['admin','coordinator','leadership'],title:'Approvals'}},{path:'/bookings/:id',component:CaseDetail,meta:{roles:bookingRoles,title:'Booking'}}]
export const nav:NavItem[]=[{key:'bookings',label:'Bookings',to:'/bookings',roles:[...bookingRoles],group:'Staff'},{key:'approvals',label:'Approvals',to:'/bookings/approvals',roles:['admin','coordinator','leadership'],group:'Staff'}]
