import io from 'socket.io-client'

import api from '../../services/api'
import router from '../../router'

export const store = {
  state: {
    tweet: {},
    tweets: [],
    users: [],
    user: {},
    like: {},
    countUsers: 0,
    disconnected: false,
    messageError: ''
  },
  mutations: {
    serviceNewTweet: (state, payload) => {
      state.tweet = payload
    },
    serviceGetUser: (state, payload) => {
      state.user = payload
    },
    setUsers: (state, payload) => {
      state.users = payload
    },
    setTweets: (state, payload) => {
      state.tweets = payload
    },
    setLike: (state, payload) => {
      state.like = payload
    },
    setDisconnected: (state, payload) => {
      state.disconnected = payload
    },
    setMessageError: (state, payload) => {
      state.messageError = payload
    },
    setCountUsers: (state, payload) => {
      state.countUsers = payload
    }
  },
  getters: {
    tweet: state => state.tweet,
    tweets: state => state.tweets,
    users: state => state.users,
    user: state => state.user,
    like: state => state.like,
    countUsers: state => state.countUsers,
    disconnected: state => state.disconnected,
    messageError: state => state.messageError
  },
  actions: {
    serviceNewTweet: async ({ commit }, payload) => {
      try {
        const { data } = await api.post('/tweets', {
          content: payload
        })

        commit('serviceNewTweet', data)
      } catch (err) {
        console.log(err)
      }
    },
    serviceGetUser: async ({ commit, dispatch }) => {
      try {
        const { data } = await api.post('/users')

        commit('serviceGetUser', data)
        dispatch('serviceConnect', data)
      } catch (err) {
        router.push({ name: 'Authenticate' })
      }
    },
    serviceConnect: async ({ commit }, payload) => {
      const server = 'http://localhost:3000'
      const socket = io(server, {
        query: { user: payload.username }
      })

      socket.on('connect', async () => {
        console.log('Connected to server.')

        try {
          const { data } = await api.get('/tweets?limit=25')
          commit('setTweets', data)
        } catch (err) {
          console.log(err.message)
        }

        commit('setDisconnected', false)
      })

      socket.on('disconnect', () => {
        console.log('You are disconnected.')
      })

      socket.on('show-max-connections', () => {
        console.log('Max limit of connections.')
        commit('setDisconnected', true)
        commit('setMessageError', 'The server has reached maximum connections. Do not close this window, you can enter at any time :)')
      })

      socket.on('client-multi-connections', () => {
        console.log('The client be connected in multiples windows.')
        commit('setDisconnected', true)
        commit('setMessageError', 'Please use only one of the application guides. After closing, refresh the page.')
      })

      socket.on('user-disconnected', (id) => {
        console.log(`The client id(${id}) is disconnected.`)
      })

      socket.on('concurrent-connections', (clientsCount) => {
        commit('setCountUsers', clientsCount)
        console.log(`${clientsCount} client connected an a server.`)
      })

      socket.on('bootstrap', (users) => {
        commit('setUsers', users)
      })

      socket.on('new-tweet', (tweets) => {
        commit('setTweets', tweets)
      })
    },
    likeOrDislike: async ({ commit }, payload) => {
      try {
        const { data, status } = await api.post(`/tweets/${payload}/like`)
        
        if (status === 204) {
           const { data } = await api.post(`/tweets/${payload}/dislike`)

           commit('setLike', data)
           return;
        }
        commit('setLike', data)
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
