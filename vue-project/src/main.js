import { createApp } from 'vue'
import App from './App.vue'
import jquery from "jquery"
Vue.prototype.$=jquery;
import router from "@/router";


createApp(App).use(router).mount('#app')
