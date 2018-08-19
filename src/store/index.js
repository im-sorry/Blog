import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  strict: true,
  state: {
    currentPage: 1,
    id: 'nimeide',
    num: 0,
    nums: [],
    loadingState: false,
    secondShow: true,
    topHide: false,
    windowWidth: 0
  },
  mutations: {
    changeId(state, payload){
      state.id = payload.id;
    },
    changeNum(state, num){
      state.num = num;
    },
    addNum(state, num){
      state.nums.push(num);
    },
    changeLoadingState(state, s){
      state.loadingState = s;
    },
    changeSecondShow(state, s){
      state.secondShow = s;
    },
    changeTopHide(state, s){
      state.topHide = s;
    },
    changeWindowWidth(state, val){
      state.windowWidth = val;
    }
  },
  actions: {
    eat({commit, dispatch}){
      commit('changeId', {id: 'gaile'})
    }
  },
  getters: {
    getSum(state){
      return state.nums.reduce((all, item) => {
        return all -= (-item);
      }, 0)
    }
  }
});

export default store;
