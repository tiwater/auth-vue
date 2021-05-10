<template>
  <div id="app">
    <router-link to="/" tag="button" id='home-button'> Home </router-link>
    <button v-if='false' v-on:click='logout' id='logout-button'> Logout </button>
    <button v-else v-on:click='login' id='login-button'> Login </button>
    <router-link to="/protected" tag="button"> Protected </router-link>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',
  methods: {
    login () {
      // this.$userMgr.signInWithRedirect()
    },
    async logout () {
      // await this.$userMgr.signOut()
    }
  }
})
</script>
