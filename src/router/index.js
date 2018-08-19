import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/components/onlineChat/'
import index from '@/components/index/'
import summery from '@/components/summery/'
import artical from '@/components/Artical/'
import news from '@/components/news/'
import articalShow from '@/components/articalShow/'
import keepMessage from '@/components/keepMessage/'
import store from '@/store/'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/onlineChat',
      name: 'onlineChat',
      component: chat
    },
    {
      path: '/summery',
      name: 'summery',
      component: summery
    },
    {
      path: '/artical',
      name: 'artical',
      component: artical,
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/articalShow:id',
      name: 'articalShow',
      component: articalShow
    },
    {
      path: '/keepMessage',
      name: 'keepMessage',
      component: keepMessage
    }
  ]
});

router.beforeEach((to, from, next) => {
  let width = window.innerWidth;
  if(width <= 950){
    store.commit('changeSecondShow', false);
  }else{
    store.commit('changeSecondShow', true);
  }
  if(width <= 700){
    store.commit('changeTopHide', true);
  }else{
    store.commit('changeTopHide', false);
  }
  store.commit('changeLoadingState', true);
  setTimeout(() => {
    next();
  }, 500)
});
router.afterEach((to, from, next) => {
  store.commit('changeLoadingState', false);
});

export default router;
