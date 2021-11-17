import Vue from 'vue'
import VueRouter from 'vue-router'

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
    },
    {
        path: '/l',
        component: () => import('../views/login/Base'),
        children: [
            {
                path: '',
                redirect: 'login'
            },
            {
                path: 'login',
                component: () => import('../views/login/Login')
            }, {
                path: 'register',
                component: () => import('../views/login/Register')
            },
        ]
    },
    {
        path: '/search',
        component: () => import('../views/search/Search')
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash',
})

export default router
