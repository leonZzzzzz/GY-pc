export default [
  {
    path: 'store/index',
    component: () => import('../views/home/Index')
  },
  {
    path: 'store/orderCust/list',
    component: () => import('../views/customer/orderCust/List')
  },
  {
    path: 'store/paymentCust/list',
    component: () => import('../views/customer/paymentCust/List')
  },
  {
    path: 'store/potentialCust/list',
    component: () => import('../views/customer/potentialCust/List')
  },
  {
    path: 'store/carousel/list',
    component: () => import('../views/carousel/List')
  },
  {
    path: 'store/coupon/list',
    component: () => import('../views/coupon/List')
  },
  {
    path: 'store/printer/list',
    component: () => import('../views/printer/List')
  },
  {
    path: 'store/setting/list',
    component: () => import('../views/setting/List'),
    redirect: 'store/setting/list/invoice',
    children: [
      {
        path: 'invoice',
        component: () => import('../views/setting/Invoice')
      },
      {
        path: 'others',
        component: () => import('../views/setting/Others')
      }
    ]
  }
]
