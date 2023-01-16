import { defineStore } from 'pinia'
import { LocalStorage, SessionStorage } from 'quasar'
import { register, login, user } from 'src/services/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    isConnected: false
  }),
  getters: {},
  actions: {
    getJwtToken () {
      return LocalStorage.getItem('token') || SessionStorage.getItem('token')
    },
    async handleRegister (params) {
      try {
        const res = await register(params)
        LocalStorage.set('token', res.data.token)
        const userData = await user(res.data.token)
        this.user = userData
        this.isConnected = true
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async handleLogin (params) {
      try {
        const res = await login(params)
        LocalStorage.set('token', res.data.token)
        const userData = await user(res.data.token)
        this.user = userData
        this.isConnected = true
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async handleLogout () {
      this.isConnected = false
      LocalStorage.clear()
      SessionStorage.clear()
    },
    async checkToken () {
      if (this.getJwtToken()) {
        this.isConnected = true
        return true
      } else {
        this.isConnected = false
        return false
      }
    },
    async loadUser () {
      try {
        const userData = await user()
        this.user = userData
      } catch (e) {
        throw new Error(e)
      }
    }
  }
})
