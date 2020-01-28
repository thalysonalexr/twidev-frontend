const TOKEN_KEY = '@twidev-Token'

export default {
  getToken () {
    return localStorage.getItem(TOKEN_KEY)
  },
  login (token) {
    localStorage.setItem(TOKEN_KEY, token)
  },
  logout () {
    localStorage.removeItem(TOKEN_KEY)
  },
  loggedIn () {
    return !!localStorage.getItem(TOKEN_KEY)
  }
}
