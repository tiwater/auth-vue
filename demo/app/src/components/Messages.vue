<template>
  <div class="messages">
    <h1 class="ui header">
      <i
        aria-hidden="true"
        class="mail outline icon"
      >
      </i>
      My Messages
    </h1>
    <div
      v-if="failed"
      class="ui error message"
    >
      <div class="content">
        <div class="header">Failed to fetch messages. Please verify the following:</div>
        <ul class="list">
          <li class="content">You've downloaded one of our resource server examples, and it's running on port 8000.</li>
          <li class="content">Your resource server example is using the same ISSUER that you have configured this Vue
            application to use.</li>
        </ul>
      </div>
    </div>

    <div v-if="messages.length">
      <p>This component makes a GET request to the resource server running at
        <code>localhost:8000/api/messages</code>
      </p>
      <p>It attaches your current access token in the
        <code>Authorization</code> header on the request, and the resource server will attempt to authenticate this access token. If the token is valid
        the server will return a list of messages. If the token is not valid or the resource server is incorrectly configured,
        you will see a 401
        <code>Unauthorized response</code>.</p>
      <p>This route is protected with the <code>requiresAuth: true</code> metadata in <code>router/index.js</code>. This ensures that this page cannot be accessed until you have authenticated and have an access token
        in local storage.</p>
      <table class="ui table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(message, index) in messages"
            :key="index"
            :id="'message-' + index"
          >
            <td>{{message.date}}</td>
            <td>{{message.text}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="ts">
import axios from 'axios'

const config = {
  oidc: {
    clientId: 'tid-demo',
    issuer: 'https://id.tiwater.cc/oauth2/v1',
    redirectUri: 'http://localhost:8080/login/callback',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages'
  }
}

export default {
  name: 'Messages',
  data () {
    return {
      failed: false,
      messages: []
    }
  },
  async created () {
    try {
      const user = await this.$userMgr.getUser();

      console.log('Messages.vue user:', user.access_token);
      
      const response = await axios.get(
        config.resourceServer.messagesUrl,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`
          }
        }
      )

      const messages = response.data.messages.map((message) => {
        let index = 1
        const date = new Date(message.date)
        const day = date.toLocaleDateString()
        const time = date.toLocaleTimeString()
        return {
          date: `${day} ${time}`,
          text: message.text,
          index: index++
        }
      })
      this.messages = messages
    } catch (e) {
      console.error(e)
      this.failed = true
    }
  }
}
</script>
