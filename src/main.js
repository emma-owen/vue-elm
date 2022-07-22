import {createApp} from 'vue'
import App from './App'
import router from './router/router'
import store from './store/'
import './config/rem'


createApp(App).use(router).use(store).mount('#app')

