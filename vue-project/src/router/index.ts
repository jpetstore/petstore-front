import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path:'/',
            name:'index',
            component : () => import('../views/index.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#000'
                next()
            }
        },
        {
            path:'/catalog/SearchProduct',
            name:'searchProduct',
            component : () => import('../views/catalog/SearchProduct.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#000'
                next()
            }
        },
        {
            path:'/account/AllOrders',
            name:'AllOrders',
            component : () => import('../views/account/AllOrders.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#000'
                next()
            }
        },
        {
            path:'/account/MyAccount',
            name:'MyAccount',
            component : () => import('../views/account/MyAccount.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#000'
                next()
            }
        },
        {
            path:'/account/ForgetPassword',
            name:'ForgetPassword',
            component : () => import('../views/account/ForgetPassword.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#000'
                next()
            }
        },
        
    ]
})

export default router