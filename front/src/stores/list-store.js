import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'
import { getAllLists, createList, deleteList, getTheLastList } from 'src/services/lists'

export const useListStore = defineStore('list', {
  state: () => ({
    list: {}
  }),
  getters: {
    getList () {
      return this.list
    }
  },
  actions: {
    async getLists (token) {
      try {
        const res = await getAllLists(token)
        this.list = res
      } catch (e) {
        throw new Error(e)
      }
    },
    async createList (params) {
      try {
        const res = await createList(params)
        this.list.push(res)
      } catch (e) {
        throw new Error(e)
      }
    },
    async deleteList (id) {
      try {
        const res = await deleteList(id)
        this.list.push(res)
      } catch (e) {
        throw new Error(e)
      }
    },
    async lastList () {
      try {
        const res = await getTheLastList()
        this.list.push(res)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
})
