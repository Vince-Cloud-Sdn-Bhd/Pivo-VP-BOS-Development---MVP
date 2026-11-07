import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import ProductMap from './pages/ProductMap.vue'
import PartnerWork from './pages/PartnerWork.vue'
import TasksPage from './pages/TasksPage.vue'
const staffRoles=['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','relationship_manager'] as const
export const routes:RouteRecordRaw[]=[{path:'/product-map',component:ProductMap,meta:{roles:staffRoles,title:'PIVO Product Map'}},{path:'/partner-work',component:PartnerWork,meta:{roles:staffRoles,title:'Partner Work'}},{path:'/tasks',component:TasksPage,meta:{roles:staffRoles,title:'Tasks'}}]
export const nav:NavItem[]=[{key:'product-map',label:'Product Map',to:'/product-map',roles:[...staffRoles],group:'Staff'},{key:'partner-work',label:'Partner Work',to:'/partner-work',roles:[...staffRoles],group:'Staff'},{key:'tasks',label:'Tasks',to:'/tasks',roles:[...staffRoles],group:'Staff'}]
