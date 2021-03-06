import api from '../../services/api'
import Auth from '../../services/auth'
import router from '../../router'

export const store = {
  state: {
    url_oauth: `${process.env.VUE_APP_API_CURRENT_VERSION}/users/github/oauth`,
    token: null,
    error: {
      show: false,
      message: null
    }
  },
  getters: {
    url_oauth: state => state.url_oauth,
    error: state => state.error
  },
  mutations: {
    auth: (state, payload) => {
      state.token = payload
    },
    setError: (state, payload) => {
      state.error = payload
    }
  },
  actions: {
    auth: async ({ commit }, payload) => {
      try {
        const { data } = await api(`/users/signin/callback?code=${payload}`)

        if (data) {
          Auth.login(data.access_token)
          commit('auth', data.access_token)
          router.push({ name: 'Feed' })
        } else {
          router.push({ name: 'Auth' })
        }
      } catch (err) {
        router.push({ name: 'Auth' })
      }
    }
  }
}
