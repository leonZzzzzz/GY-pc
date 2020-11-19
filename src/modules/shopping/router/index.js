export default [
  //#region 门店
  {
    path: 'mall/store/list',
    component: () => import('../views/store/List')
  },
  {
    path: 'mall/store/category',
    component: () => import('../views/store/category/List')
  },
  {
    path: 'mall/store/form',
    component: () => import('../views/store/Form')
  },
  {
    path: 'mall/store/registration/list',
    component: () => import('../views/store/store-registration/List')
  },
  {
    path: 'mall/store/refundRecord/list',
    component: () => import('../views/store/refundRecord/List')
  },
  //#endregion

  //#region 商品管理
  {
    path: 'mall/product/list',
    component: () => import('../views/product/List')
  },
  {
    path: 'mall/storeList/list',
    component: () => import('../views/store-list/List')
  },
  {
    path: 'mall/order/product-platform/list',
    component: () => import('../views/product/platform-product/List')
  },
  {
    path: 'mall/product/list/form',
    component: () => import('../views/product/Form')
  },
  {
    path: 'mall/product/category/list',
    component: () => import('../views/category/List')
  },
  {
    path: 'mall/product/brand/list',
    component: () => import('../views/brand/List')
  },
  {
    path: 'mall/product/params/list',
    component: () => import('../views/params/List')
  },
  {
    path: 'mall/product/group-shopping/list',
    component: () => import('../views/group-shopping/List')
  },
  {
    path: 'mall/product/group-shopping/form',
    component: () => import('../views/group-shopping/Form')
  },
  {
    path: 'mall/product/help-shopping/list',
    component: () => import('../views/help-shopping/List')
  },
  {
    path: 'mall/product/help-shopping/form',
    component: () => import('../views/help-shopping/Form')
  },
  //#endregion

  //#region 订单管理
  {
    path: 'mall/order/product/list',
    component: () => import('../views/order/product/List')
  },
  {
    path: 'mall/order/product/invoiceList',
    component: () => import('../views/order/product/InvoiceList')
  },
  {
    path: 'mall/order/fyDelivery/list',
    component: () => import('../views/order/fyDelivery/List')
  },
  {
    path: 'mall/order/product/detail',
    component: () => import('../views/order/product/Detail')
  },
  {
    path: 'mall/order/group-shopping/list',
    component: () => import('../views/order/group-shopping/List')
  },
  {
    path: 'mall/order/help-shopping/list',
    component: () => import('../views/order/help-shopping/List')
  },
  {
    path: 'mall/order/invoice/list',
    component: () => import('../views/order/invoice/List')
  },
  {
    path: 'mall/order/invoice/detail',
    component: () => import('../views/order/invoice/Detail')
  },
  //#endregion

  //#region 售后
  {
    path: 'mall/service/after-sale/list',
    component: () => import('../views/service/after-sale/List')
  },
  {
    path: 'mall/service/after-sale/detail',
    component: () => import('../views/service/after-sale/Detail')
  },
  {
    path: 'mall/service/compensation/list',
    component: () => import('../views/service/compensation/List')
  },
  //#endregion

  //#region 配置
  {
    path: 'mall/config/logistics',
    component: () => import(/* webpackChunkName: "config" */ '../views/config/logistics/List')
  },
  // 运费补贴
  {
    path: 'mall/config/transportDiscount',
    component: () => import(/* webpackChunkName: "config" */ '../views/config/transportDiscount/List')
  },
  {
    path: 'mall/config/transaction',
    redirect: 'mall/config/transaction/order',
    component: () => import(/* webpackChunkName: "config" */ '../views/config/transaction/Index'),
    children: [
      {
        path: 'order',
        component: () => import('../views/config/transaction/Order')
      },
      {
        path: 'logistics',
        component: () => import('../views/config/transaction/Logistics')
      }
    ]
  },
  {
    path: 'mall/config/static-page',
    redirect: 'mall/config/static-page/about-us',
    component: () => import(/* webpackChunkName: "config" */'../views/config/static-page/Index'),
    children: [
      {
        path: 'about-us',
        component: () => import('../views/config/static-page/about-us')
      },
      {
        path: 'about-us-store',
        component: () => import('../views/config/static-page/about-us-store')
      }
    ]
  },
  {
    path: 'mall/config/agreement',
    redirect: 'mall/config/agreement/MEMBER_TOS',
    component: () => import(/* webpackChunkName: "config" */'../views/config/agreement/Index'),
    children: [
      {
        path: 'MEMBER_TOS',
        component: () => import('../views/config/agreement/MemberTos')
      },
      {
        path: 'STORE_TOS',
        component: () => import('../views/config/agreement/StoreTos')
      },
      {
        path: 'WITHDRAWAL_MEMBER_FAQ',
        component: () => import('../views/config/agreement/WithdrawalMember')
      },
      {
        path: 'WITHDRAWAL_STORE_FAQ',
        component: () => import('../views/config/agreement/WithdrawalStore')
      }
    ]
  },
  //#endregion

  // 客户管理
  {
    path: 'mall/customer/list',
    component: () => import('../views/customer/List')
  },

  //优惠券管理
  {
    path: 'mall/coupon/list',
    component: () => import('../views/coupon/List')
  },

  //#region 业务员管理
  {
    path: 'mall/salesman/list',
    component: () => import('../views/salesman/List')
  },
  {
    path: 'mall/salesman/Slist',
    component: () => import('../views/salesman/Slist')
  },
  {
    path: 'mall/salesman/form',
    component: () => import('../views/salesman/Form')
  },
  {
    path: 'mall/salesman/SlistFrom',
    component: () => import('../views/salesman/SlistFrom')
  },
  {
    path: 'mall/salesman/member/list',
    component: () => import('../views/salesman/member/List')
  },
  {
    path: 'mall/salesman/member/form',
    component: () => import('../views/salesman/member/Form')
  },
  {
    path: 'mall/salesman/member/Slist',
    component: () => import('../views/salesman/member/Slist')
  },
  {
    path: 'mall/salesman/member/SlistFrom',
    component: () => import('../views/salesman/member/SlistFrom')
  },

  //#endregion

  //#region 数据管理
  {
    path: 'mall/platform-data/salesorder',
    component: () => import('../views/platform-data/Salesorder')
  },
  {
    path: 'mall/platform-data/creditorder',
    component: () => import('../views/platform-data/Creditorder')
  },
  {
    path: 'mall/platform-data/storepay',
    component: () => import('../views/platform-data/Storepay')
  },
  //#endregion

  {
    path: 'mall/withdraw/custList',
    component: () => import('../views/withdraw/custList')
  },
  {
    path: 'mall/withdraw/storeList',
    component: () => import('../views/withdraw/storeList')
  },

  // 司机管理
  {
    path: 'mall/driver/list',
    component: () => import('../views/driver/List')
  }
]
