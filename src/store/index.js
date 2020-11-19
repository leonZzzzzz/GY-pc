import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
import createPersistedState from 'vuex-persistedstate'
// import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const isDevelopment = process.env.NODE_ENV == 'development'

export default new Vuex.Store({
  strict: isDevelopment ? true : false,
  plugins: [createPersistedState({
    paths: ['isSession','tableOld']
  })],
  state: {
    // 会话过期
    isSession: false
  },
  mutations: {
    updateSession(state, data) {
      state.isSession = data
    }
  },
  // actions
})
