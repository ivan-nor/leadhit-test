<template>
  <div>
    <h1>LeadHit</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="siteId" @input="clearError">
      <button type="submit">Войти</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data () {
    return {
      siteId: '',
      error: ''
    }
  },
  methods: {
    async login () {
      console.log('LOGIN', this.siteId)
      if (this.siteId.length !== 24) {
        this.error = 'id сайта должен содержать 24 символа'
        return
      }

      try {
        const response = await fetch('https://track-api.leadhit.io/client/test_auth', {
          method: 'GET',
          headers: {
            'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
            'Leadhit-Site-Id': this.siteId
          }
        })

        const data = await response.json()

        console.log('data', data)

        if (data.message === 'ok') {
          console.log('success')
          // localStorage.setItem('leadhit-site-id', this.siteId)
          store.dispatch('setAuthenticated', true, this.siteId)
          this.$router.push({ name: 'Analytics' })
        } else {
          this.error = 'Ошибка аутентификации'
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        this.error = 'Ошибка сервера'
      }
    }
  }

}
</script>
