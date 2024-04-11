import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../components/AuthPage.vue'
import AnalyticsPage from '../components/AnalyticsPage.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    redirect: '/analytics' // Перенаправляем с корневого пути на страницу аналитики
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: AnalyticsPage,
    beforeEnter: (to, from, next) => {
      const leadhitSiteId = localStorage.getItem('leadhit-site-id')
      // console.log(to, from, next, leadhitSiteId)
      if (!leadhitSiteId) {
        next('/auth') // Перенаправляем на страницу аутентификации, если ключ отсутствует
      } else {
        store.dispatch('setAuthenticated', { isAuthenticated: true, leadhitSiteId })
        next() // Переходим на страницу аналитики
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
