import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import AppointmentsPage from './pages/AppointmentsPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/appointments',component:AppointmentsPage,meta:{roles:['admin','coordinator','developer','purchaser'],title:'Appointments'}}]
export const nav:NavItem[]=[{key:'appointments',label:'Appointments',to:'/appointments',roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','relationship_manager'],group:'Staff'}]
