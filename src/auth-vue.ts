import { App } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import Oidc, { UserManager } from 'oidc-client'
import { OnAuthRequiredFunction, AuthVueOptions, AuthRequiredFunction } from './types'

let _userMgr: UserManager;
let _authRequired: AuthRequiredFunction;
let _onAuthRequired: OnAuthRequiredFunction;
let _debug: boolean = false;

async function isAuthenticated(userMgr: UserManager) {
  return userMgr !== null && await userMgr.getUser() !== null;
}

const guardSecureRoute = async (userMgr: UserManager) => {
  if (_onAuthRequired) {
    await _onAuthRequired(userMgr)
  } else {
    _debug && console.log('Start redirecting to login');
    await userMgr.signinRedirect({ state: window.location.pathname })
  }
}

export const navigationGuard = async (to: RouteLocationNormalized) => {
  if (_authRequired(to)) {
    // guard the secure route
    const isAuth = await isAuthenticated(_userMgr);
    _debug && console.log('Not authenticated, start to guard the route');
    if (!isAuth) {
      await guardSecureRoute(_userMgr)
      return false
    }

    return true
  }

  return true
}

function install (app: App, options: AuthVueOptions) {
  if (options.debug) {
    Oidc.Log.logger = console;
    Oidc.Log.level = Oidc.Log.DEBUG;
  }

  _debug = options.debug;

  _userMgr = new UserManager(options);
  _authRequired = options.authRequired || (to => to.matched.some(record => record.meta.requiresAuth));
  _onAuthRequired = options.onAuthRequired;

  // add UserManager instance to Vue
  app.config.globalProperties.$userMgr = _userMgr;

  // In App.vue, this.$userMgr is not accessible, have to use provide/inject instead.
  app.provide('userMgr', _userMgr);
}

export default { install }
