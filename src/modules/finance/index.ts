import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import FinancePage from './pages/FinancePage.vue'
const roles=['finance_preparer','finance_approver','finance_executor','leadership','admin'] as const
export const routes:RouteRecordRaw[]=[{path:'/finance',component:FinancePage,meta:{roles,title:'Finance'}}]
export const nav:NavItem[]=[{key:'finance',label:'Finance',to:'/finance',roles:[...roles],group:'Staff'}]
