import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/scss/main.scss'
import SvgIcon from '@jamescoyle/vue-icon'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
