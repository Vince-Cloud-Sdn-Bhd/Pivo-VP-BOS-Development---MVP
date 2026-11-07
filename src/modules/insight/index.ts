import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import ReportsPage from './pages/ReportsPage.vue'
import ControlRoomPage from './pages/ControlRoomPage.vue'
const roles=['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer'] as const
export const routes:RouteRecordRaw[]=[{path:'/reports',component:ReportsPage,meta:{roles,title:'Reports'}},{path:'/control-room',component:ControlRoomPage,meta:{roles,title:'Control room'}}]
export const nav:NavItem[]=[{key:'reports',label:'Reports',to:'/reports',roles:[...roles],group:'Reports'},{key:'control',label:'Control room',to:'/control-room',roles:['admin','leadership'],group:'Reports'}]
