<template>
  <!-- feed twidev -->
  <section id="feed">
    <v-loading
      :is-loading="isLoading"/>
    <v-navbar
      :user="user"
      :users-connected="countUsers"/>
    <v-message
      v-if="disconnected"
      :message="messageError"/>
    <!-- init feed -->
    <div
      class="tweets"
      :key="index"
      v-for="(tweet, index) in tweets">
      <new-post
        :tweet="tweet"/>
    </div>
    <!-- end -->
    <transition name="bounce">
      <new-tweet
        v-if="show"
        :bio="user.bio"
        :avatar="user.avatar"
        @close="show = false"
        @createTweet="createTweet($event)"/>
    </transition>
    <button
      @click="show = true"
      class="float-button bottom rounded"
      title="New Tweed!">
      <img
        class="logo-tweetar"
        src="../../assets/tweet.svg"
        alt="Avatar tweet">
    </button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import New from '../../components/Tweet/New.vue'
import Post from '../../components/Tweet/Post.vue'
import Navbar from '../../components/Navbar.vue'
import Message from '../../components/Message.vue'
import Loading from '../../components/Loading.vue'

export default {
  name: 'Feed',
  data () {
    return {
      show: false
    }
  },
  components: {
    'new-tweet': New,
    'new-post': Post,
    'v-navbar': Navbar,
    'v-message': Message,
    'v-loading': Loading
  },
  methods: {
    createTweet (value) {
      this.show = false
      this.serviceNewTweet(value)
    },
    ...mapActions([
      'serviceNewTweet',
      'serviceGetUser'
    ])
  },
  computed: {
    ...mapGetters([
      'tweet',
      'tweets',
      'user',
      'countUsers',
      'disconnected',
      'messageError',
      'isLoading'
    ])
  },
  created () {
    const api = async () => {
      await this.serviceGetUser()
    }

    api()
  }
}
</script>

<style scoped>

section#feed{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.tweets{ width: 100%; }

.float-button{
  cursor: pointer;
  position: fixed;
  right: 20px;
  background-color: rgb(255, 173, 31);
  box-shadow: 2px 2px 3px #424242;
}

.bottom{ bottom: 20px; }

.rounded{
  width: 60px;
  height: 60px;
  border-radius: 60px;
}

.logo-tweetar{
  width: 30px;
  height: 30px;
}

</style>
