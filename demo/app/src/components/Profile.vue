<template>
  <div class="profile">
    <h1 class="ui header">
      <i
        aria-hidden="true"
        class="drivers license outline icon"
      >
      </i>
      My User Profile
    </h1>
    <p>
      Below is the information from your ID token and is now stored in local storage.
    </p>
    <p>
      This route is protected with the <code>requiresAuth: true</code> meta in <code>router/index.js</code>. This ensures that this page cannot be accessed until you authenticate.
    </p>
    <h2 class="ui header">Profile</h2>
    <table class="ui table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(profile, index) in profiles"
          :key="index"
        >
          <td>{{profile.name}}</td>
          <td :id="'profile-' + profile.name">{{profile.value}}</td>
        </tr>
      </tbody>
    </table>
    <h2 class="ui header">Full Details</h2>
    <table class="ui table">
      <thead>
        <tr>
          <th>Claim</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(claim, index) in claims"
          :key="index"
        >
          <td>{{claim.claim}}</td>
          <td :id="'claim-' + claim.claim">{{claim.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { UserManager } from "oidc-client";
import { defineComponent, inject, onMounted, ref } from "vue";

export default defineComponent ({
  name: 'Profile',
  setup () {
    const claims = ref([{claim: '', value: '' }]);
    const profiles = ref([{name: '', value: '' }]);
    const fetchUser = async () => {
      let userMgr = inject<UserManager>('userMgr');
      if (userMgr) {
        await userMgr.getUser().then((user) => {
          if (user) {
            const _claims = Object.entries(user).map(entry => ({ claim: entry[0], value: entry[1] }))
            claims.value = _claims;

            const _profiles = Object.entries(user.profile).map(entry => ({ name: entry[0], value: entry[1] }))
            profiles.value = _profiles;
          }
        });
      }
    }

    onMounted(() => {
      fetchUser();
    })

    return {
      claims,
      profiles
    }
  },
})
</script>
