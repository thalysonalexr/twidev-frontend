<template>
  <transition name="bounce">
    <div class="toggle-box">
      <div class="wrapper">
        <form @submit.prevent="createTweet()" method="post">
          <div class="wrapper-btns">
            <button
              type="button"
              class="btn-close"
              @click="$emit('close')">
              <font-awesome-icon class="close" icon="times" />
            </button>
            <input
              class="btn-tweet"
              :class="newTweet !== '' ? 'btn-active' : 'btn-disable'"
              value="Tweedar"
              type="submit"
              :disabled="newTweet === ''">
          </div>
          <div class="new-tweet">
            <textarea
              id="tweet"
              cols="10"
              rows="5"
              name="tweet"
              minlength="1"
              maxlength="280"
              @keyup="handleCounter()"
              @keydown="handleCounter()"
              v-model="newTweet"
              placeholder="What is happening?">
            </textarea>
          </div>
        </form>
        <transition name="bounce">
        <v-error
          v-if="error.show"
          :message="error.message"
          @close="error.show = false" />
        </transition>
        <article v-if="bio" class="bio">
          <p>"{{ bio }}"</p>
        </article>
        <figure>
          <img
            v-if="avatar"
            class="avatar"
            :src="avatar"
            alt="Avatar of user">
        </figure>
        <span class="counter">{{ counter }}/280</span>
      </div>
    </div>
  </transition>
</template>

<script>
import Error from '../../components/Error.vue'

export default {
  name: 'New',
  props: {
    avatar: {
      type: String,
      required: false,
      default: ''
    },
    bio: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    'v-error': Error
  },
  data () {
    return {
      newTweet: '',
      counter: 0,
      error: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    handleCounter () {
      this.counter = this.newTweet.length
    },
    createTweet () {
      if (!this.newTweet) {
        this.error.message = 'Type something to Tweed!'
        this.error.show = true
      } else {
        this.$emit('createTweet', this.newTweet)
        this.newTweet = ''
        this.closed = true
      }
    }
  }
}
</script>

<style scoped>

.toggle-box{
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  border-radius: 15px;
}

.toggle-box .new-tweet{
  background-color: #fefefe;
  margin: 5% auto;
  border: 1px solid #888;
  width: 90%;
  border-radius: 15px;
  background-color: rgba(21, 32, 43);
  height: 65%;
}

textarea#tweet{
  width: 90%;
  height: 100%;
  padding: 5% 0;
  font-size: 1.3em;
  font-family: 'Ubuntu', sans-serif;
  color: #f5f5f5;
  background-color: inherit;
  height: 100%;
}

.counter{
  color: #f5f5f5;
  font-size: 1.2em;
  font-weight: 1000;
}

.wrapper{
  width: 100%;
  height: 100%;
  padding: 10% 0;
  display: flex;
  flex-direction: column;
}

.wrapper form{ height: 100%; }

.btn-tweet{
  padding: 2%;
  border-radius: 20px;
  width: 125px;
  margin: 0 5%;
  font-weight: 1000;
  text-align: center;
  color: #f5f5f5;
  box-shadow: 2px 2px 3px #424242;
  font-size: 1.2em;
}

.btn-disable{
  cursor: default;
  background-color: #dbdbdb;
}

.btn-active{
  cursor: pointer;
  background-color: rgb(255, 173, 31);
}

.btn-close{
  background: transparent;
  font-size: 2em;
  width: 25px;
  height: 25px;
  margin: 0 7%;
  cursor: pointer;
}

.btn-close svg{ color: #f5f5f5; }

.close{ font-size: 0.7em; }

.wrapper-btns{
  display: flex;
  justify-content: space-between;
}

.avatar{
  width: 100px;
  height: 100px;
  border-radius: 100px;
}

.bio{ margin: 5% 0; }

.bio p{
  font-style: italic;
  color: #f5f5f5;
  font-size: 1em;
}

</style>
