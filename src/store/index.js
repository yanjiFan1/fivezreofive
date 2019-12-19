import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const state = {
  userInfo: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})