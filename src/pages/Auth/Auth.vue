<template>
  <!-- authentication with github -->
  <section id="authenticate">
    <header>
      <h1>Twidev</h1>
      <h2>Log in with your Github Account!</h2>
    </header>
    <!-- squares animation keyframe -->
    <div class="squares">
      <div class="square left fast"></div>
      <div class="square left low"></div>
      <div class="square center fast"></div>
      <div class="square center low"></div>
      <div class="square right fast"></div>
      <div class="square right low"></div>
    </div>
    <div class="container-button">
      <a
        class="button"
        :href="url_oauth"
        title="Log in with Github Oauth">
        Login with Github!
        <img
          class="icon"
          alt="Github logo"
          src="../../assets/github.svg">
      </a>
    </div>
    <transition name="bounce">
      <v-error
        v-if="error.show"
        :message="error.message"
        @close="error.show = false">
      </v-error>
    </transition>
  </section>
</template>

<script>
import Auth from '../../services/auth'
import Error from '../../components/Error.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Auth',
  data () {
    return {
      error: {
        show: false,
        message: ''
      }
    }
  },
  components: {
    'v-error': Error
  },
  computed: {
    ...mapGetters(['url_oauth'])
  },
  methods: {
    ...mapActions(['auth'])
  },
  created () {
    const { code } = this.$route.query

    if (Auth.getToken()) {
      this.$router.push({ name: 'Feed' })
    }

    if (code) {
      this.auth(code)
    }
  }
}
</script>

<style scoped>

section#authenticate{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1, h2{
  color: #f5f5f5;
  text-align: center;
}

h1{
  font-size: 3em;
  font-weight: 1000;
}

h2{
  font-weight: 100;
  font-size: 1em;
}

.container-button .button{ width: 200px; }

.container-button .button:hover{ transform: scale(1.3, 1.3); }

.container-button .button .icon{
  width: 40px;
  height: 40px;
  padding-left: 5px;
}

.squares{
  display: flex;
  justify-content: center;
}

.square{
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.15);
  display: block;
  position: absolute;
  bottom: 0px;
}

.left{ left: 10px; }
.right{ right: 10px; }

.square.left.fast{ animation: up 3s infinite; }

.square.left.low{ animation: up 3.5s infinite; }

.square.center.fast{ animation: up 2.5s infinite; }

.square.center.low{ animation: up 3s infinite; }

.square.right.fast{ animation: up 2s infinite; }

.square.right.low{ animation: up 2.5s infinite; }

@keyframes up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-600px);
  }
}

@media all and (min-width: 440px) {
  h1{ font-size: 3.5em; }
}

@media all and (min-width: 660px) {
  h1{ font-size: 4em; }
}

</style>
