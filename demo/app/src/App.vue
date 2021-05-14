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
          Auth-Vue Demo
        </router-link>
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
import { User, UserManager } from 'oidc-client'
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
  name: 'app',
  data: function () {
    return {
      userMgr: inject<UserManager>('userMgr'),
      user: ref({}),
    }
  },
  created () { this.setup() },
  methods: {
    async setup() {
      if (this.userMgr) {
        await this.userMgr.getUser().then((val) => this.user = val as User);
      }

      console.log('App.vue user: ', this.user);
    },
    async login() {
      if (this.userMgr) {
        await this.userMgr.signinRedirect( { state: window.location.pathname })
      }
    },
    async logout() {
      if (this.userMgr) {
        await this.userMgr.signoutRedirect( { state: '/' })
      }
    } 
  }
})
</script>
