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

<script>
export default {
  name: 'Profile',
  data () {
    return {
      claims: []
    }
  },
  async created () {
    this.claims = await Object.entries(await this.$userMgr.getUser()).map(entry => ({ claim: entry[0], value: entry[1] }))
  }
}
</script>
