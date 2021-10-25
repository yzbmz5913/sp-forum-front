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
                path: 'notification',
                component: () => import('../views/user/Notification')
            },
            {
                path: 'posts',
                component: () => import('../views/user/Posts')
            },
            {
                path: 'fav',
                component: () => import('../views/user/Fav')
            },
            {
                path: 'history',
                component: () => import('../views/user/History')
            },
            {
                path: 'follower',
                component: () => import('../views/user/Follow'),

            },
            {
                path: 'following',
                component: () => import('../views/user/Follow')
            }
        ]
    },
    {
        path: '/thread/:tid',
        component: () => import('../views/thread/Thread')
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash',
})

export default router
