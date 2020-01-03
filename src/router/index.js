import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from '@/components/login';
import signup from '@/components/signup';
import store from '@/store';

Vue.use(Router)
import axios from 'axios'
axios.defaults.baseURL='http://106.12.146.17:9700'
const router = new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/signup',
      component: signup
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && store.state.name === '') {
    next({
      path: '/login'
    })
  }
  if (to.meta.requireAuth) {
    if (store.state.name === '') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next();
  }
})

export default router;
