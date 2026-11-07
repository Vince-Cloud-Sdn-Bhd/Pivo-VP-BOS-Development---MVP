import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import NexusPage from './pages/NexusPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/nexus',component:NexusPage,meta:{roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','agent','developer'],title:'Nexus'}}]
export const nav:NavItem[]=[{key:'nexus',label:'Nexus',to:'/nexus',roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','agent','developer'],group:'Marketing and integrations'}]
