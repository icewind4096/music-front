import { createApp } from 'vue'

import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import router from './router'

import store from './store/index.js'

import './permission.js'

import App from './App.vue'

const myApp = createApp(App)

myApp.use(router)

myApp.use(store)

myApp.use(Quasar, {
    plugins:{
        Notify
    },
})

myApp.mount('#app')
