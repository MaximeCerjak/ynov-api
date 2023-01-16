import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'
import { getAllTasks, createTask, updateTask, deleteTask } from 'src/services/tasks'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),
  getters: {},
  actions: {
    async getTasks () {
      try {
        const res = await getAllTasks()
        this.tasks = res
      } catch (e) {
        throw new Error(e)
      }
    },
    async createTask (params) {
      try {
        await createTask(params)
        this.getTasks()
      } catch (e) {
        throw new Error(e)
      }
    },
    async validateTask (id, params) {
      try {
        await updateTask(id, params)
        this.getTasks()
      } catch (e) {
        throw new Error(e)
      }
    },
    async deleteTask (id) {
      try {
        await deleteTask(id)
        this.getTasks()
      } catch (e) {
        throw new Error(e)
      }
    }
  }
})
