import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createI18n } from 'vue-i18n'
import messages from './locales'

const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  messages
})

app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
