import {createRouter,createWebHistory} from 'vue-router'
import LoginPage from '../layouts/LoginPage.vue'
import RoleLayout from '../layouts/RoleLayout.vue'
import ComingSoon from '../modules/home/pages/ComingSoon.vue'
import {moduleRoutes} from './registry'
import {useSession} from '../stores/session'
export const router=createRouter({history:createWebHistory(import.meta.env.BASE_URL),routes:[
  {path:'/login',component:LoginPage},
  {path:'/denied',component:ComingSoon,props:{title:'Record not found',detail:'The record does not exist or you do not have access.'}},
  {path:'/',component:RoleLayout,children:[{path:'',redirect:'/login'},...moduleRoutes]},
  {path:'/:pathMatch(.*)*',component:ComingSoon,props:{title:'Page not found',detail:'Check the link or return to the role home.'}},
]})
router.beforeEach(to=>{
  if(to.path==='/login'||to.path==='/denied'||to.path.startsWith('/booking/'))return true
  const session=useSession(),role=session.activePersona?.activeRole
  if(!role)return '/login'
  const roles=to.meta.roles as string[]|undefined
  if(roles&&!roles.includes(role))return '/denied'
  return true
})
