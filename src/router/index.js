import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Example',
    meta: { title: '账户管理', icon: 'example' },
    children: [
      {
        path: 'clients',
        name: 'clients',
        component: () => import('@/views/account/clientList'),
        meta: { title: '客户列表', icon: 'table' }
      },
      {
        path: 'accounts',
        name: 'accounts',
        component: () => import('@/views/account/userList'),
        meta: { title: '账户列表', icon: 'table' }
      }
      // {
      //   path: 'aprove',
      //   name: 'aprove',
      //   component: () => import('@/views/account/approveList'),
      //   meta: { title: '审批列表', icon: 'table' }
      // }
    ]
  },

  {
    path: '/inspection_task',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/taskList'),
        meta: { title: '巡检任务', icon: 'table' }
      },
      {
        path: 'create',
        name: 'createTask',
        hidden: true,
        component: () => import('@/views/taskList/createTask')
      }
    ]
  },
  {
    path: '/info_statistics',
    component: Layout,
    redirect: 'noRedirect',
    name: 'info_statistics',
    meta: {
      title: '信息统计',
      icon: 'form'
    },
    children: [
      {
        path: 'add_case',
        component: () => import('@/views/infoStatistics/addCase'),
        meta: { title: '新增案件', icon: 'nested' }
      },
      {
        path: 'case_list',
        component: () => import('@/views/infoStatistics/addCase'),
        meta: { title: '案件列表', icon: 'table' }
      },
      {
        path: 'work_lsit',
        component: () => import('@/views/infoStatistics/workList'),
        meta: { title: '工作信息列表', icon: 'table' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
