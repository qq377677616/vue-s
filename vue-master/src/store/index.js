import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  userInfo: {
    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/OuUlqVWSgMzXibzhD85y61GjjLpSNK33TeGjAc14hSWvAqAKDQylg5oBhDlLE2dD9GRibQRavYxw78p8eFZUwI6g/132',
    nickName: "扬帆"
  },
  balance: 8888
}
const getters = {
  userInfoNew(state) {
    let _userInfo = JSON.parse(JSON.stringify(state.userInfo))
    // let { userInfo: _userInfo } = state
    let { nickName } = _userInfo
    _userInfo.nickName = nickName + '5555'
    return _userInfo
  }
}
const mutations = {
  add(state, params) { 
    state.balance = (state.balance + params.num) > 0 ? (state.balance + params.num) : 0
  },
  cheng(state) {
    state.balance = state.balance * 2
  }
}
const actions = {
  asyncAdd({ commit }, params) {
    commit("add", params)
    setTimeout(() => { commit("cheng") }, 2000)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})