import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import DeveloperPage from './pages/DeveloperPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/developer',component:DeveloperPage,meta:{roles:['developer'],title:'Developer'}}]
export const nav:NavItem[]=[]
