import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import DealsPage from './pages/DealsPage.vue'
import JvPage from './pages/JvPage.vue'
const roles=['admin','leadership','relationship_manager','landowner','fund_partner','developer'] as const
export const routes:RouteRecordRaw[]=[{path:'/deals',component:DealsPage,meta:{roles,title:'Deals'}},{path:'/jv',component:JvPage,meta:{roles,title:'JV holding'}}]
export const nav:NavItem[]=[{key:'deals',label:'Deals and JV',to:'/deals',roles:['admin','leadership','relationship_manager','developer'],group:'Staff'}]
