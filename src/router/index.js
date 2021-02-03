import Vue from "vue"
import VueRouter from "vue-router"
import login from '../pages/Login.vue'
import home from '../pages/Home.vue'
import order from '../pages/Order.vue'
import search from '../pages/Search.vue'
import center from '../pages/Center.vue'
import shop from '../pages/shop/shop.vue'
import goods from '../pages/shop/goods.vue'
import evaluate from '../pages/shop/evaluate.vue'
import business from '../pages/shop/business.vue'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/home',
            component: home,
            meta: { requiresAuth: true }
        },
        {
            path: '/order',
            component: order,
            meta: { requiresAuth: true }
        },
        {
            path: '/search',
            component: search,
            meta: { requiresAuth: true }
        },
        {
            path: '/center',
            component: center,
            meta: { requiresAuth: true }
        },
        {
            path: '/shop',
            component: shop,
            children: [
                {
                    path: '',
                    redirect: '/shop/goods'
                },
                {
                    path: '/shop/goods',
                    component: goods,
                },
                {
                    path: '/shop/evaluate',
                    component: evaluate,
                },
                {
                    path: '/shop/business',
                    component: business,
                },
            ]
        },
    ]
})