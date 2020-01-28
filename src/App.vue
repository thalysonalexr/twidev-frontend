<template>
  <div id="app">
    <v-loading
      class="loading"
      :is-loading="isLoading"/>
    <router-view/>
  </div>
</template>

<script>
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    'v-loading': Loading
  },
  data () {
    return {
      isLoading: true
    }
  },
  created () {
    setInterval(() => {
      this.isLoading = false
    }, 3000)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');

*{
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  box-sizing: border-box;
}

ul{ list-style: none; }

html, body, #app{
  min-height: 100%;
  height: 100%;
}

body{
  background-color: rgba(21, 32, 43);
  background-image: url('./assets/bg.png');
  background-repeat: repeat;
  background-position: center center;
  background-blend-mode: multiply;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


h1, h2{ font-family: 'Ubuntu', sans-serif; }

.button{
  margin-top: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%;
  background-color: rgb(255, 173, 31);
  color: #f5f5f5;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Ubuntu', sans-serif;
  text-decoration: none;
  font-size: 1em;
  transition: ease-out 500ms;
  font-weight: 700;
  box-shadow: 2px 2px 3px 2px #171717;
}

.error{
  background-color: #e85858;
  border: 1px solid #992323;
  color: #f5f5f5;
  border-radius: 3px;
  padding: 3%;
  margin: 2% auto;
  max-width: 80%;
  display: flex;
}

.error button.close{
  color: #992323;
  width: 25px;
  height: 25px;
  border-radius: 30px;
  padding: 1%;
  cursor: pointer;
  font-weight: 1000;
  background: transparent;
}

/* Animações de entrada e saída podem utilizar diferentes  */
/* funções de duração e de tempo.                          */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>
