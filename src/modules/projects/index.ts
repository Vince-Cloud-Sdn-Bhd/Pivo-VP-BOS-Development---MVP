import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import ProjectsPage from './pages/ProjectsPage.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
const roles=['admin','coordinator','leadership','developer','agent','relationship_manager'] as const
export const routes:RouteRecordRaw[]=[{path:'/projects',component:ProjectsPage,meta:{roles,title:'Projects'}},{path:'/projects/:id',component:ProjectDetail,meta:{roles,title:'Project'}}]
export const nav:NavItem[]=[{key:'projects',label:'Projects',to:'/projects',roles:[...roles],group:'Staff'}]
