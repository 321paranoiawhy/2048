import { createApp } from 'vue'
import Particles from 'particles.vue3'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
