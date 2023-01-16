import { api } from 'boot/axios'

export const getAllLists = async () => {
  try {
    const response = await api.get('/lists')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getTheLastList = async () => {
  try {
    const response = await api.get('/lists/limit&skip=1&limit=1')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createList = async (params) => {
  try {
    const response = await api.post('/lists', params)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteList = async (id) => {
  try {
    const response = await api.delete(`/lists/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
