export default [
  
  {
    path: 'core/config/reward',
    component: () => import('../views/reward/Index'),
    redirect: 'core/config/reward/recommend',
    children: [
      {
        path: 'recommend',
        component: () => import('../views/reward/Recommend')
      },
      {
        path: 'svcharge',
        component: () => import('../views/reward/Svcharge')
      },
      {
        path: 'fydelivery',
        component: () => import('../views/reward/FyDelivery')
      },
      {
        path: 'recharge-setting',
        component: () => import('../views/reward/RechargeSetting')
      },
      {
        path: 'wechat-setting',
        component: () => import('../views/reward/WechatSetting')
      },
      {
        path: 'poundage',
        component: () => import('../views/reward/Poundage')
      },
      {
        path: 'poundage-member',
        component: () => import('../views/reward/PoundageMember')
      }
    ]
  }
]