import api from './api'
import Auth from './auth'

export const isAuthenticated = async () => {
  if ( ! Auth.loggedIn()) {
    return false
  }

  try {
    const { data } = await api.post('/users/token/validate')
    return data.username ? true : false
  } catch (err) {
    return false
  }
}
