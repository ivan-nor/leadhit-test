<!-- eslint-disable no-unused-vars -->
<template>
  <header>
    <RouterLink to="/" style="text-decoration: none;">
        <h1>{{ t('header.title') }}</h1>
    </RouterLink>

    <RouterLink to="/analytics">{{ t('header.analytics') }}</RouterLink>

    <div v-if="isAuth">
      <button @click="handleLogout" >{{ t('header.logout') }}</button>
    </div>
    <div v-else>
      <button @click="handleLogin">{{ t('header.login') }}</button>
    </div>
  </header>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const store = useStore()
const { t } = useI18n()
const isAuth = computed(() => store.state.isAuthenticated)

function handleLogout () {
  store.dispatch('setAuthenticated', { isAuthenticated: false })
  router.push('/auth')
}

function handleLogin () {
  router.push('/auth')
}

</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
}
</style>

<script>
export default {
  name: 'HeaderComponent'
}
</script>
