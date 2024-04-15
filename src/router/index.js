import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../components/AuthPage.vue'
import AnalyticsPage from '../components/AnalyticsPage.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    redirect: '/analytics'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
    beforeEnter: (to, from, next) => {
      const leadhitSiteId = localStorage.getItem('leadhit-site-id')

      if (!leadhitSiteId) {
        next()
      } else {
        store.dispatch('setAuthenticated', { isAuthenticated: true, leadhitSiteId })
        next('/analytics')
      }
    }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: AnalyticsPage,
    beforeEnter: (to, from, next) => {
      const leadhitSiteId = localStorage.getItem('leadhit-site-id')

      if (!leadhitSiteId) {
        next('/auth')
      } else {
        store.dispatch('setAuthenticated', { isAuthenticated: true, leadhitSiteId })
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
