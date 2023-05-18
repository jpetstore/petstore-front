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
        }
        
    ]
})

export default router