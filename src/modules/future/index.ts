import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import FuturePage from './pages/FuturePage.vue'
export const routes:RouteRecordRaw[]=[{path:'/future',component:FuturePage,meta:{roles:['admin','leadership','developer','coordinator'],title:'Future services'}}]
export const nav:NavItem[]=[{key:'future',label:'Future services',to:'/future',roles:['admin','leadership','developer','coordinator'],group:'Future services',preview:'future'}]
