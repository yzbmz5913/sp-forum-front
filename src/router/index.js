import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home'),
  },
  {
    path: '/user/:uid',
    component: () => import('../views/user/User'),
    children: [
      {
        path: '',
        redirect: 'notification',
      },
      {
        path: 'notification',
        component: () => import('../views/user/Notification')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
