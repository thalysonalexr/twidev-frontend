<template>
  <div class="tweet-card">
    <img
      class="avatar"
      :src="tweet.author.avatar"
      :alt="'Avatar of ' + tweet.author.name">
    <div class="wrapper-column">
      <div class="wrapper user">
        <span class="name">
          {{ tweet.author.name }}
        </span>
        <span class="username">
          @{{ tweet.author.username }}
        </span>
      </div>
      <div class="wrapper time">
        <span class="date">
          {{ lastTime(tweet.createdAt) }}
        </span>
      </div>
      <div class="wrapper tweet">
        <article>
          <p>{{ tweet.content }}</p>
        </article>
      </div>
      <div class="wrapper likes">
        <a
          class="btn-like"
          :class="tweet.likes.includes(user._id) ? 'liked': 'disliked'"
          @click="likeOrDislike(tweet._id)">
          <span class="count-likes">
            {{ tweet.likes.length }}
          </span>
          <span class="like">
            <font-awesome-icon icon="heart" />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Post',
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    lastTime (lastDate) {
      return moment(lastDate).fromNow()
    },
    ...mapActions(['likeOrDislike'])
  }
}
</script>

<style scoped>

.tweet-card{
  display: flex;
  border-bottom: 1px solid rgba(219, 219, 219, 0.1);
  padding: 5%;
}

img.avatar{
  width: 40px;
  height: 40px;
  border-radius: 40px;
}

.wrapper-column{
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
}

.wrapper{
  margin-left: 10px;
  text-align: left;
  width: 100%;
}

.wrapper.tweet p{
  font-size: 1.2em;
  color: #fcfcfc;
}

span.username, span.name{
  font-size: 1em;
  color: #f5f5f5;
  text-align: left;
  overflow: hidden;
}

span.name{
  margin-right: 5px;
  font-weight: 700;
}

span.username{ color: rgba(219, 219, 219, 0.3); }

.wrapper.likes{
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.wrapper.likes span{ font-size: 1.2em; }

span.like{ margin-left: 10px; }

.btn-like{
  cursor: pointer;
  border-radius: 50px;
  padding: 2%;
  display: flex;
  align-content: space-between;
}

.liked{
  color: rgb(224, 36, 94);
}

.btn-like:hover{
  color: rgb(224, 36, 94);
  transition: 200ms ease-in;
  animation: 1s pulse infinite;
}

.disliked{ color: #2c3e50; }

/* from: https://www.florin-pop.com/blog/2019/03/css-pulse-effect/  */
@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(224, 36, 94, 0.7);;
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}

</style>
