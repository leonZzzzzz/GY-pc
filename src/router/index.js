import Vue from 'vue'
import Router from 'vue-router'
// import mobilePage from '@/views/plugins/lottery/Mobile.vue'
import base from '@/modules/base/router'
import shopping from '@/modules/shopping/router'
import systemManager from '@/modules/system-manager/router'
import store from '@/modules/store/router'
import core from '@/modules/core/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "main" */ '@/modules/core/views/login/Login.vue'),
      name: 'login'
    },
    {
      path: '/main',
      component: () => import(/* webpackChunkName: "main" */ '@/modules/core/views/Main.vue'),
      children: [
        {
          path: 'index',
          component: () => import(/* webpackChunkName: "main" */ '@/modules/core/views/index/Index')
        },
        ...base,
        ...shopping,
        ...systemManager,
        ...store,
        ...core
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
