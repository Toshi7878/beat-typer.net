import { createApp } from 'vue'
import App from './App.vue'
import {createBootstrap} from 'bootstrap-vue-next'
import YouTube from 'vue3-youtube'
import { Modal } from '@kouts/vue-modal'
import {Tabs, Tab} from 'vue3-tabs-component'
import './assets/JS/components/KeyDown/shortcutKey.js'


// Add the necessary CSS
import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@kouts/vue-modal/dist/vue-modal.css'
import './assets/CSS/app.css'
import "./assets/SCSS/custom.scss"


//font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPause, faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPause, faForward)


const app = createApp(App)

app.use(createBootstrap()) // Important
app.config.devtools = true;

app
.component('YouTube', YouTube)
.component('Modal', Modal)
.component('tabs', Tabs)
.component('tab', Tab)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')