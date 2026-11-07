import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import AssistantPage from './pages/AssistantPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/assistant',component:AssistantPage,meta:{roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer','agent','banker','lawyer','relationship_manager','purchaser','landowner','fund_partner'],title:'Assistant'}}]
export const nav:NavItem[]=[]
