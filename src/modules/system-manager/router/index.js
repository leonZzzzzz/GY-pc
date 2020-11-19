export default [
  // 用户角色
  {
    path: 'power/role',
    component: () => import(/*webpackChunkName: "system"*/ '../views/power/role/List')
  },
  // 用户角色权限
  {
    path: 'power/role/detail',
    component: () => import(/*webpackChunkName: "system"*/ '../views/power/role/Detail')
  },
  // 用户账号
  {
    path: 'power/account',
    component: () => import(/*webpackChunkName: "system"*/ '../views/power/account/List')
  },
  // 访问权限
  {
    path: 'power/permission',
    component: () => import(/*webpackChunkName: "system"*/ '../views/power/permission/List')
  },
  // 权限列表
  {
    path: 'power/permission/detail',
    component: () => import(/*webpackChunkName: "system"*/ '../views/power/permission/Detail')
  },
  // 应用管理
  {
    path: 'app',
    component: () => import(/*webpackChunkName: "system"*/ '../views/app/List')
  },
  // 公众号数据
  {
    path: 'app/wechatDetail',
    component: () => import(/*webpackChunkName: "system"*/ '../views/app/WechatDetail')
  },
  // 应用权限
  {
    path: 'app/detail',
    component: () => import(/*webpackChunkName: "system"*/ '../views/app/Detail')
  }
]
