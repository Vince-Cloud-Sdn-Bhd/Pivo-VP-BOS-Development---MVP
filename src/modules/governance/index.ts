import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import GovernancePage from './pages/GovernancePage.vue'
export const routes:RouteRecordRaw[]=[{path:'/governance',component:GovernancePage,meta:{roles:['admin','leadership'],title:'Governance'}}]
export const nav:NavItem[]=[{key:'governance',label:'Governance',to:'/governance',roles:['admin','leadership'],group:'Quality and governance'}]
