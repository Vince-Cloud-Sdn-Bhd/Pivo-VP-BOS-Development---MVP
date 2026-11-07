import StaffOverview from './pages/StaffOverview.vue'
import ComingSoon from './pages/ComingSoon.vue'
import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
export const routes:RouteRecordRaw[]=[{path:'/overview',component:StaffOverview,meta:{roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','relationship_manager'],title:'Overview'}},{path:'/coming-soon',component:ComingSoon,meta:{roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer','agent','banker','lawyer','purchaser','landowner','fund_partner','relationship_manager'],title:'Coming soon'}}]
export const nav:NavItem[]=[{key:'overview',label:'Overview',to:'/overview',roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','relationship_manager'],group:'Staff'}]
