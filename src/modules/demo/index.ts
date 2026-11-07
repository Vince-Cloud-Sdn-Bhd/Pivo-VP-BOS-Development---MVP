import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import DemoGuide from './pages/DemoGuide.vue'
import DevComponents from './pages/DevComponents.vue'
import Walkthrough from './pages/Walkthrough.vue'
export const routes:RouteRecordRaw[]=[{path:'/demo',component:DemoGuide,meta:{roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer','agent','banker','lawyer','purchaser','landowner','fund_partner','relationship_manager'],title:'Demo guide'}},{path:'/demo/walkthrough',component:Walkthrough,meta:{roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer','agent','banker','lawyer','purchaser','landowner','fund_partner','relationship_manager'],title:'Walkthrough'}},{path:'/dev/components',component:DevComponents,meta:{roles:['admin'],title:'Component gallery'}}]
export const nav:NavItem[]=[]
