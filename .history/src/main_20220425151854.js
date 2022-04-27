import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// particles
import Particles from 'particles.vue3'

createApp(App).use(store).use(router).mount('#app')
