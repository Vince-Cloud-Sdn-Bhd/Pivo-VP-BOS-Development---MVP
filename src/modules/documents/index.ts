import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import DocumentsPage from './pages/DocumentsPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/documents',component:DocumentsPage,meta:{roles:['admin','coordinator','developer','banker','lawyer','purchaser','landowner','fund_partner'],title:'Documents'}}]
export const nav:NavItem[]=[{key:'documents',label:'Documents',to:'/documents',roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','relationship_manager'],group:'Staff'}]
