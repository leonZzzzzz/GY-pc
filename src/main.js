import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/utils'
import api from './api'
import '@/components'
import './plugins/element.js'
import * as filters from './filter'
import VueJsonp from 'vue-jsonp'
import clearForm from './mixins/clear-form'
import { BASEURL, IMGURL } from './utils/config'

Vue.config.productionTip = false

Vue.use(VueJsonp)
Vue.mixin(clearForm)

Vue.prototype.utils = utils
Vue.prototype.$http = api
Vue.prototype.imgHost = IMGURL
Vue.prototype.projectUrl = BASEURL

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
