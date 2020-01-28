import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from './pages/Auth/Auth.vue'
import Feed from './pages/Feed/Feed.vue'
import Users from './pages/Users/Users.vue'

import { isAuthenticated } from './services/middlewares'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Auth, name: 'Auth' },
    {
      path: '/feed',
      beforeEnter: async (to, from, next) => {
        const auth = await isAuthenticated()
        return auth ? next() : next('/login')
      },
      component: Feed,
      name: 'Feed'
    },
    {
      path: '/users',
      beforeEnter: async (to, from, next) => {
        const auth = await isAuthenticated()
        return auth ? next() : next('/login')
      },
      component: Users,
      name: 'Users'
    },
    { path: '*', redirect: '/feed' }
  ]
})
