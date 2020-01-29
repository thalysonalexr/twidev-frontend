import axios from 'axios'
import Auth from './auth'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_CURRENT_VERSION,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async config => {
  const access_token = Auth.getToken()

  if (access_token) {
    config.headers.Authorization = access_token
  }

  return config
})

export default api
