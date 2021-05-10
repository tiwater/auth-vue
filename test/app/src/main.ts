import { createApp } from 'vue'
import AuthVue from '../../../dist'
import App from './App.vue'
import router from './router'

const redirectUri = window.location.origin + '/login/callback'

const config = {
  authority: 'http://localhost:3000/oauth2/v1',
  client_id: 'tiwater-docs',
  // We cannot use window.location here. Have to use define manually.
  redirect_uri: redirectUri,
  response_type: 'id_token',
  scope: 'openid profile',

  filterProtocolClaims: true,
  loadUserInfo: true,
  authRequired() {
    return true;
  },
  debug: true,
}

const app = createApp(App)
app.use(router)
app.use(AuthVue, config)
app.mount('#app')
