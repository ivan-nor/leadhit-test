<template>
  <header>
    <h1>LeadHit</h1>
    <router-link to="/analytics">Analytics</router-link>
    <button @click="handleLogout" v-if="isAuth">Logout</button>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const isAuth = store.state.isAuthenticated

onMounted(() => {
  console.log(store.state.isAuthenticated)
})

function handleLogout () {
  store.dispatch('setAuthenticated', false)
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
