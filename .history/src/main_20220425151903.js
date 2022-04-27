import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// particles
// https://juejin.cn/post/7039212268428460062
import Particles from 'particles.vue3'

createApp(App).use(store).use(router).mount('#app')
