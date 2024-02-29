import { createApp } from 'vue'
import App from './App.vue'
import {Tabs, Tab} from 'vue3-tabs-component'
import { VueGoodTable } from 'vue-good-table-next';
import {createBootstrap} from 'bootstrap-vue-next'
import YouTube from 'vue3-youtube'
import { Modal } from '@kouts/vue-modal'
import './assets/JS/components/KeyDown/shortcutKey.js'

// Add the necessary CSS
import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@kouts/vue-modal/dist/vue-modal.css'
import './assets/CSS/app.css'



const app = createApp(App)

app.use(createBootstrap()) // Important
app.config.devtools = true;

app
.component('tabs', Tabs)
.component('tab', Tab)
.component('YouTube', YouTube)
.component('vueGoodTable', VueGoodTable)
.component('Modal', Modal)
.mount('#app')