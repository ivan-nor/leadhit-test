<template>
  <div>
    <h1>LeadHit</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="siteId" @focus="clearError">

      <button type="submit">{{ t('auth.submit') }}</button>

      <p v-if="error" class="invalid">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import store from '@/store'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()

export default {
  setup () {
    const { t } = useI18n()

    return { t }
  },
  data () {
    return {
      siteId: '',
      error: ''
    }
  },
  methods: {
    async login () {
      if (this.siteId.length !== 24) {
        this.error = this.t('errors.length')

        return
      }

      try {
        console.log('req', this.siteId)
        const response = await fetch('https://track-api.leadhit.io/client/test_auth', {
          method: 'GET',
          headers: {
            'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
            'Leadhit-Site-Id': this.siteId // 5f8475902b0be670555f1bb3
          }
        })

        const data = await response.json()

        if (data.message === 'ok') {
          store.dispatch('setAuthenticated', { isAuthenticated: true, leadhitSiteId: this.siteId })
          router.push('/analytics')
        } else {
          this.error = this.t('errors.auth')
        }
      } catch (error) {
        this.error = this.t('errors.server')
      }
    },
    clearError () {
      this.error = ''
      this.siteId = ''
    }
  }

}
</script>

<style>
.invalid {
  color: red;
}
</style>
