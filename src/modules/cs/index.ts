import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import CsPage from './pages/CsPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/cs',component:CsPage,meta:{roles:['admin','coordinator','leadership'],title:'Customer Success'}}]
export const nav:NavItem[]=[{key:'cs',label:'Customer Success',to:'/cs',roles:['admin','coordinator','leadership'],group:'Staff'}]
