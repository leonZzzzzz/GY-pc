export default [
  //#region 操作日志
  {
    path: 'base/logs/list',
    component: () => import('../views/logs/List')
  },
  //#endregion

  //#region 图文管理
  {
    path: 'base/news/list',
    component: () => import('../views/news/list/List')
  },
  {
    path: 'base/news/detail',
    component: () => import('../views/news/list/Detail')
  },
  {
    path: 'base/news/category/list',
    component: () => import('../views/news/category/List')
  },
  //#endregion

  //#region 消息模板
  {
    path: 'base/template/list',
    component: () => import('../views/template/List')
  },
  {
    path: 'base/template/form',
    component: () => import('../views/template/Form')
  },
  {
    path: 'base/template/detail',
    component: () => import('../views/template/Detail')
  },
  //#endregion

  //#region 广告图
  {
    path: 'base/config/banner/list',
    component: () => import('../views/banner-super/List')
  },
  //#endregion

  //#region 全局配置
  {
    path: 'base/config/about',
    component: () => import('../views/config/About')
  },
  //#endregion
  // 公告配置
  {
    path: 'base/config/notice/list',
    component: () => import('../views/notice/List') 
  },
  {
    path: 'base/config/sparea/list',
    component: () => import('../views/specialArea/List')
  }
]
