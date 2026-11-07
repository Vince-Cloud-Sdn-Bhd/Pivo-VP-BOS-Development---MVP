import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../../types'
import AdminPage from './pages/AdminPage.vue'
const roles=['admin'] as const
export const routes:RouteRecordRaw[]=['users','partners','assignments','roles','changes','imports'].map(section=>({path:`/admin/${section}`,component:AdminPage,meta:{roles,title:`Admin ${section}`}}))
export const nav:NavItem[]=[{key:'admin',label:'Admin',to:'/admin/users',roles:[...roles],group:'Admin'}]
