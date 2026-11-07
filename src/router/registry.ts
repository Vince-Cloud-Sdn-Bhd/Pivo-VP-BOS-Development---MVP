import type {RouteRecordRaw} from 'vue-router'
import type {NavItem} from '../types'
const modules=import.meta.glob('../modules/*/index.ts',{eager:true}) as Record<string,{routes:RouteRecordRaw[];nav:NavItem[]}>
export const moduleRoutes=Object.values(modules).flatMap(module=>module.routes)
export const moduleNav=Object.values(modules).flatMap(module=>module.nav)
