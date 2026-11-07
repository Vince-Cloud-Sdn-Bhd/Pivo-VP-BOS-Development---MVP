import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import ScorecardsPage from './pages/ScorecardsPage.vue'
export const routes:RouteRecordRaw[]=[{path:'/scorecards',component:ScorecardsPage,meta:{roles:['admin','coordinator','finance_preparer','finance_approver','finance_executor','leadership','developer','banker','lawyer','relationship_manager'],title:'Scorecards'}}]
export const nav:NavItem[]=[{key:'scorecards',label:'Scorecards',to:'/scorecards',roles:['admin','leadership','developer','banker','lawyer','relationship_manager'],group:'Quality and governance',preview:'proposed'}]
