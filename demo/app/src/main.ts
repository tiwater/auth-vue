import { createApp } from 'vue'
import AuthVue from 'auth-vue'
import App from './App.vue'
import router from './router'

const loginRedirectUri = window.location.origin + '/login/callback'
const logoutRedirectUri = window.location.origin + '/logout/callback'

const config = {
  authority: 'http://localhost:3000/oauth2/v1',
  // authority: 'https://id.tiwater.cc/oauth2/v1',
  // authority: 'https://dev-3868374.okta.com/oauth2/default',
  // client_id: '0oaq67jbegfRteblA5d6', 
  client_id: 'tid-demo',
  // We cannot use window.location here. Have to use define manually.
  redirect_uri: loginRedirectUri,
  post_logout_redirect_uri: logoutRedirectUri, // Logout redirect
  response_type: 'id_token token',
  // response_type: 'code', // Okta
  scope: 'openid profile',

  filterProtocolClaims: true,
  loadUserInfo: true,
  debug: true
}

createApp(App)
.use(router)
.use(AuthVue, config)
.mount('#app')
