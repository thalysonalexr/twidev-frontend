<template>
  <span :title="isLoading"></span>
</template>

<script>
import { pleaseWait } from 'please-wait'

import 'please-wait/build/please-wait.css'
import 'spinkit/spinkit.min.css'

import logo from '../assets/github.svg'

export default {
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      pleaseWaitInstance: null
    }
  },
  mounted () {
    this.updatePleaseWait()
  },
  beforeUpdate () {
    this.updatePleaseWait()
  },
  methods: {
    updatePleaseWait () {
      if (this.isLoading && this.pleaseWaitInstance == null) {
        this.pleaseWaitInstance = pleaseWait({
          backgroundColor: 'rgba(21, 32, 43)',
          logo: logo,
          loadingHtml: `
          <div class="sk-swing">
            <div class="sk-swing-dot"></div>
            <div class="sk-swing-dot"></div>
          </div>`
        })
      }
      
      if (!this.isLoading && this.pleaseWaitInstance != null) {
        this.pleaseWaitInstance.finish()
      }
    }
  }
}
</script>

<style>
div.sk-swing{
  margin: 0 auto!important;
}
:root{
  --sk-color: #fcfcfc!important;
  --sk-size: 40px;
}
.pg-loading-logo{
  width: 40px;
  height: 40px;
}
</style>
