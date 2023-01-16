<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title class="flex items-center" @click="() => $router.push({ name: 'homepage' })">
          <img
            alt="Todo logo"
            src="~assets/logo.png"
            style="width: 25px; height: 25px"
          >
          Todo App
        </q-toolbar-title>
        <div v-if="userStore.isConnected">
          <q-btn outline label="Se déconnecter" color="primary" no-caps class="q-mx-md" @click="handleLogout"/>
        </div>
        <div v-else>
          <q-btn outline label="Se connecter" color="primary" no-caps class="q-mx-md" to="/login"/>
          <q-btn outline label="S'inscrire" color="primary" no-caps class="q-mx-md" to="/register"/>
          <q-btn outline label="getConnect" color="primary" no-caps class="q-mx-md" @click="areUConnect"/>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { LocalStorage } from 'quasar'
import { useUserStore } from 'src/stores/user-store'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = async () => {
  await userStore.handleLogout().catch((err) => console.log(err))
  await router.push({ name: 'homepage' }).catch((err) => console.log(err))
}

const areUConnect = () => {
  console.log(userStore.getIsConnected)
}

// export default {
//   data () {
//     return {
//       token: LocalStorage.getItem('token'),
//       connect: userStore.checkToken()
//     }
//   },
//   computed: {
//     isAuthenticated () {
//       return !!this.token
//     }
//   },
//   methods: {
//     handleLogout,
//     areUConnect
//   }
// }
</script>
