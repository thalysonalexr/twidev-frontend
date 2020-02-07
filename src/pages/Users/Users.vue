<template>
  <section class="users-online">
    <v-loading
      :is-loading="isLoading"/>
    <v-navbar
      :user="user"
      :users-connected="countUsers"/>
    <div
      class="card"
      v-for="(user, index) in users" :key="index">
      <img
        class="avatar"
        :src="user.avatar"
        :alt="'Avatar of ' + user.name">
      <div class="wrapper-column">
        <span class="text name">
          {{ user.name }}
        </span>
        <div class="wrapper-row">
          <span class="text username">
            @{{ user.username }}
          </span>
          <span class="text tweets">
            {{ user.total_tweets }}&nbsp;tweeds
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Navbar from '../../components/Navbar.vue'
import Loading from '../../components/Loading.vue'

export default {
  name: 'Users',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    'v-navbar': Navbar,
    'v-loading': Loading
  },
  computed: {
    ...mapGetters(['user', 'users', 'countUsers'])
  },
  methods: {
    ...mapActions(['serviceGetUser'])
  },
  created () {
    this.serviceGetUser()
  }
}
</script>

<style scoped>

.users-online{
  width: 100%;
  height: 100%;
}

.card{
  display: flex;
  align-content: space-between;
  border: 1px solid rgba(160,160,255,0.2);
  border-radius: 5px;
  background-color: #4fc08d;
  padding: 3%;
  margin: 3%;
  box-shadow: 1px 2px 2px 1px #171717;
}

.wrapper-column{
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
}

.wrapper-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.text{
  color: #fcfcfc;
  font-family: 'Ubuntu', sans-serif;
  display: block;
  text-align: left;
  color: #2c3e50;
  font-family: 'Ubuntu', sans-serif;
}

.text.username{
  font-size: 10px;
  margin-bottom: 5px;
  font-weight: 1000;
}

.text.tweets{
  font-size: 12px;
  font-weight: 1000;
}

.text.name{ font-size: 1em; }

.avatar{
  width: 35px;
  height: 35px;
  border-radius: 20px;
  margin: 0 5px;
}

</style>
