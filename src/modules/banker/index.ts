import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import BankerPage from './pages/BankerPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/banker',component:BankerPage,meta:{roles:['banker'],title:'Banker'}}]
export const nav:NavItem[]=[]
