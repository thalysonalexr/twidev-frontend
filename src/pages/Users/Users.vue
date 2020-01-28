<template>
  <section class="users-online">
    <v-navbar
      :user="user"
      :users-connected="countUsers"/>
    users
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from '../../components/Navbar.vue'

export default {
  name: 'Users',
  components: {
    'v-navbar': Navbar
  },
  computed: {
    ...mapGetters(['user', 'users', 'countUsers'])
  }
}
</script>

<style scoped>

.users-online{
  width: 100%;
  margin: 0 5%;
}

.card{
  display: flex;
  align-content: space-between;
  border: 1px solid rgba(160,160,255,0.2);
  border-radius: 5px;
  padding: 5% 4%;
}

.wrapper{
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
}

.text{
  color: #fcfcfc;
  font-family: 'Ubuntu', sans-serif;
  display: block;
  text-align: left;
}

.text.username{
  font-size: 10px;
  margin-bottom: 5px;
}

.text.name{
  font-size: 1em;
  font-weight: 100;
}

.avatar{
  width: 35px;
  height: 35px;
  border-radius: 20px;
  margin: 0 5px;
}

</style>
