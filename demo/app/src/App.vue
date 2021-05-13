<template>
  <div id="app">
    <div class="ui inverted top fixed menu">
      <div class="ui container">
        <router-link
          to="/"
          class="header item"
        >
          <img
            class="ui mini image"
            src="./assets/logo.png"
          >
          &nbsp;
          Auth-Vue Sample App
        </router-link>
        <!--
        <a
          class="item"
          v-if="!user || !user.profile"
          v-on:click="login()"
        >
        Login
        </a>
        <router-link
          to="/messages"
          class="item"
          id="messages-button"
          v-if="user && user.profile"
        >
          <i
            aria-hidden="true"
            class="mail outline icon">
          </i>
          Messages
        </router-link>
        <router-link
          to="/profile"
          class="item"
          id="profile-button"
          v-if="user && user.profile"
        >
        Profile
        </router-link>
        <a
          id="logout-button"
          class="item"
          v-if="user && user.profile"
          v-on:click="logout()"
        >
        Logout
        </a>
        -->
      </div>
    </div>
    <div
      class="ui text container"
      style="margin-top: 7em;"
    >
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'app',
  data: function () {
    return {
      user: {}
    }
  },
  methods: {
    // async setup() {
    //   const app = getCurrentInstance()
    //   const $userMgr = app && app.appContext.config.globalProperties.$userMgr
    //   this.user = $userMgr.getUser()
    // },
    // async login() {
    //   const app = getCurrentInstance()
    //   const $userMgr = app && app.appContext.config.globalProperties.$userMgr
    //   await $userMgr.signinRedirect( { state: window.location.pathname })
    // } 
  }
})
</script>
