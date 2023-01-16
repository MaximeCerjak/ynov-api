import { api } from 'boot/axios'

export const register = (params) => api.post('/users/register', params)
export const login = (params) => api.post('/users/login', params)
export const user = async () => {
  try {
    const response = await api.get('/users/me')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
