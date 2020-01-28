<template>
  <div class="navbar">
    <nav class="nav-extended">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Twidev</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <font-awesome-icon icon="bars"/>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link
              to="/users"
              class="item-menu"
              ref="noopener noreferrer">
              Online users&nbsp;
              <span class="users-connected">
                ({{ usersConnected }})
              </span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/feed"
              class="item-menu"
              ref="noopener noreferrer">
              Go to Feed!
            </router-link>
          </li>
          <li>
            <a
              @click="logout()"
              class="item-menu"
              rel="noopener noreferrer"
              title="Log out">
              <font-awesome-icon icon="sign-out-alt"/>
              Quit
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li class="user">
        <img
          class="avatar"
          :src="user.avatar"
          :alt="'Avatar of ' + user.name">
        <span class="name">
          {{ user.name }}
        </span>
        <span class="username">
          @{{ user.username }}
        </span>
      </li>
      <li>
        <router-link
          to="/users"
          class="item-menu"
          ref="noopener noreferrer">
          Online users&nbsp;
          <span class="users-connected">
            ({{ usersConnected }})
          </span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/feed"
          class="item-menu"
          ref="noopener noreferrer">
          Go to Feed!
        </router-link>
      </li>
      <li>
        <a
          @click="logout()"
          class="item-menu"
          rel="noopener noreferrer"
          title="Log out">
          <font-awesome-icon icon="sign-out-alt"/>
          Quit
        </a>
      </li>
      <li>
        <span>
          Made with&nbsp;
          <font-awesome-icon class="heart" icon="heart" />
          &nbsp;by&nbsp;
          <a href="https://www.linkedin.com/in/thalysonrodrigues/"
            rel="noopener noreferrer"
            target="_blank">
            Thalyson Rodrigues
          </a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Auth from '../services/auth'

import 'materialize-css/dist/css/materialize.min.css'
import { Sidenav } from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'Navbar',
  props: {
    user: {
      type: Object,
      required: true
    },
    usersConnected: {
      type: Number,
      required: true
    }
  },
  methods: {
    logout () {
      Auth.logout()
      this.$router.push({ name: 'Auth' })
    },
  },
  mounted () { 
    const elems = document.querySelectorAll('.sidenav')
    Sidenav.init(elems, {})
  }
}
</script>

<style scoped>

.navbar{
  width: 100%;
}

.nav-extended{
  background-color: rgba(21, 32, 43);
  border-bottom: 1px solid rgba(219, 219, 219, 0.1);
}

.brand-logo{
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.5em;
  font-weight: 1000;
}

li.user .avatar{
  width: 100%;
  height: 100%;
}

li.user .name{
  font-size: 1em;
  font-weight: 1000;
  overflow: hidden;
}

.users-connected{
  font-weight: 1000;
}

.heart{ color: rgb(224, 36, 94); }

li a.item-menu{
  text-transform: uppercase;
  font-style: italic;
  color: #f5f5f5;
}

.sidenav{
  background-color: rgba(21, 32, 43);
}

</style>
