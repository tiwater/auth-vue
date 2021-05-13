import { App } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import Oidc, { UserManager } from 'oidc-client'
import { OnAuthRequiredFunction, AuthVueOptions, AuthRequiredFunction } from './types'
import { REFERRER_PATH_STORAGE_KEY } from './constants';

let _userMgr: UserManager;
let _authRequired: AuthRequiredFunction;
let _onAuthRequired: OnAuthRequiredFunction;
let _debug: boolean = false;

function setOriginalUri(originalUri: string): void {
  localStorage.setItem(REFERRER_PATH_STORAGE_KEY, originalUri);
}

export function getOriginalUri(): string | null {
  const originalUri = localStorage.getItem(REFERRER_PATH_STORAGE_KEY);
  return originalUri;
}

export function removeOriginalUri(): void {
  localStorage.removeItem(REFERRER_PATH_STORAGE_KEY);
}

async function isAuthenticated(userMgr: UserManager) {
  return userMgr !== null && await userMgr.getUser() !== null;
}

const guardSecureRoute = async (userMgr: UserManager) => {
  if (_onAuthRequired) {
    await _onAuthRequired(userMgr)
  } else {
    _debug && console.log('Start redirecting to login');
    await userMgr.signinRedirect()
  }
}

export const navigationGuard = async (to: RouteLocationNormalized) => {
  if (_authRequired(to)) {
    // track the originalUri for guardSecureRoute
    setOriginalUri(to.fullPath);

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
  
  console.log('AuthVue.install')

  _debug = options.debug;

  _userMgr = new UserManager(options);
  _authRequired = options.authRequired || (to => to.matched.some(record => record.meta.requiresAuth));
  _onAuthRequired = options.onAuthRequired;

  // add UserManager instance to Vue
  app.config.globalProperties.$userMgr = _userMgr;
  //app.provide('userMgr', _userMgr);
  if (options.userStore) {
    app.config.globalProperties.$userStore = options.userStore;
  }

  app.mixin({
    data () {
      return {
        userStore: this.$userStore
      }
    }
  })
}

export default { install }
