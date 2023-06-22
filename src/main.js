import Vue from 'vue'
import App from './App.vue'
import routes from './routes.js'

import '../scss/custom.scss'

Vue.createApp(App).use(routes).mount('#app')
