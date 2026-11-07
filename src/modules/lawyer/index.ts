import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import LawyerPage from './pages/LawyerPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/lawyer',component:LawyerPage,meta:{roles:['lawyer'],title:'Lawyer'}}]
export const nav:NavItem[]=[]
