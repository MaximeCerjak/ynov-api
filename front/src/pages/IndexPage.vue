<template>
  <q-page class="flex flex-center">
    <div style="width: 400px;">
      <h1 style="margin-bottom: 25px">Ynov Tasks Manager</h1>
      <p style="font-size: 1.3rem">Try out this new lightweight tasks manager for everyday tasks</p>
        <q-btn label="Get started" style="background-color: #613973; color: white;" @click="() => $router.push({ name: 'login' })" />
    </div>
    <img src="~assets/header-img.png" alt="homepage picture" style="width: 500px; margin-left: 100px">
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'

const router = useRouter()
const token = LocalStorage.getItem('token')

export default defineComponent({
  name: 'IndexPage',
  setup () {
    return {
      token
    }
  },
  methods: {
    handleLogout () {
      LocalStorage.remove('token')
      router.push({ name: 'dashboard' })
    }
  }
})
</script>
