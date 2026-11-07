import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import AgentPage from './pages/AgentPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/agent',component:AgentPage,meta:{roles:['agent'],title:'Agent'}}]
export const nav:NavItem[]=[]
