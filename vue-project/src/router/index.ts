import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path:'/',
            name:'index',
            component : () => import('../views/index.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },

        {
            path:'/catalog/SearchProduct',
            name:'searchProduct',
            component : () => import('../views/catalog/SearchProduct.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/catalog/Main',
            name:'Main',
            component : () => import('../views/catalog/Main.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },



        {
            path:'/account/AllOrders',
            name:'AllOrders',
            component : () => import('../views/account/AllOrders.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/account/Register',
            name:'Register',
            component : () => import('../views/account/Register.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/account/MyAccount',
            name:'MyAccount',
            component : () => import('../views/account/MyAccount.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/account/ForgetPassword',
            name:'ForgetPassword',
            component : () => import('../views/account/ForgetPassword.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/account/Signin',
            name:'ForgetPassword',
            component : () => import('../views/account/Signin.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/catalog/product/:productId',
            name:'Product',
            component : () => import('../views/catalog/Product.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html')!.style.background = '#d6d9c5'
                next()
            }
        }
        ,
        {
            path:'/order/OrderForm',
            name:'OrderForm',
            component : () => import('../views/order/OrderForm.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html')!.style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/order/ConfirmOrder',
            name:'ConfirmOrder',
            component : () => import('../views/order/ConfirmOrder.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html')!.style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/order/ViewOrder',
            name:'ViewOrder',
            component : () => import('../views/order/ViewOrder.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html')!.style.background = '#d6d9c5'
                next()
            }
        },
        {
            path:'/cart',
            name:'cart',
            component : () => import('../views/cart/cart.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },        {
            path:'/catalog/:categoryId',
            name:'category',
            // @ts-ignore
            component : () => import('../views/catalog/Category.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        },        {
            path:'/catalog/item/:itemId',
            name:'item',
            // @ts-ignore
            component : () => import('../views/catalog/Item.vue'),
            beforeEnter : (to, from, next) => {
                document.querySelector('html').style.background = '#d6d9c5'
                next()
            }
        }
        
    ]
})

export default router