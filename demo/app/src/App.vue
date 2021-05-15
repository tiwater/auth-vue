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
import { defineComponent, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'app',
  setup () {
    const userMgr = inject<UserManager>('userMgr');
    const user = ref<User>({} as User);

    const fetchUser = async () => {
      if (userMgr) {
        await userMgr.getUser().then((_user) => { 
          if (_user) {
            user.value = _user;
            console.log('App.onMounted user', user.value)
          }
        }); 
      }
    }

    onMounted(async () => { 
      if (userMgr) {
        userMgr.events.addUserSignedIn(() => {
          console.log('userMgr.events.addUserSignedIn');
          fetchUser();
        })
        userMgr.events.addUserSignedOut(() => {
          console.log('userMgr.events.addUserSignedOut');
          user.value = {} as User;
        })
      }
      fetchUser();
    });

    function login() {
      if (userMgr) {
        userMgr.signinRedirect( { state: window.location.pathname })
      }
    }
    function logout() {
      if (userMgr) {
        userMgr.signoutRedirect( { state: '/' })
      }
    } 
    return {
      user,
      login,
      logout
    }
  }
})
</script>
