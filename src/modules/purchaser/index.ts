import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import PurchaserHome from './pages/PurchaserHome.vue'
import PropertyPage from './pages/PropertyPage.vue'
import ProgressPage from './pages/ProgressPage.vue'
import PaymentsPage from './pages/PaymentsPage.vue'
import HelpPage from './pages/HelpPage.vue'
import PublicBookingPage from './pages/PublicBookingPage.vue'
const roles=['purchaser'] as const
export const routes:RouteRecordRaw[]=[{path:'/home',component:PurchaserHome,meta:{roles,title:'Home'}},{path:'/property/:caseId',component:PropertyPage,meta:{roles,title:'My property'}},{path:'/progress',component:ProgressPage,meta:{roles,title:'Progress'}},{path:'/payments',component:PaymentsPage,meta:{roles,title:'Payments'}},{path:'/help',component:HelpPage,meta:{roles,title:'Help'}},{path:'/booking/:bookingId',component:PublicBookingPage,meta:{roles:['admin','coordinator','developer','agent','banker','lawyer','purchaser','landowner','fund_partner','relationship_manager','finance_preparer','finance_approver','finance_executor','leadership'],title:'Booking'}}]
export const nav:NavItem[]=[]
