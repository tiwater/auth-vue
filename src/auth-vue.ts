import { App } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import Oidc, { UserManager } from 'oidc-client'
import { OnAuthRequiredFunction, AuthVueOptions } from './types'
import { REFERRER_PATH_STORAGE_KEY } from './constants';

let _userMgr: UserManager;
let _onAuthRequired: OnAuthRequiredFunction;

function setOriginalUri(originalUri: string): void {
  const storage = localStorage;
  storage.setItem(REFERRER_PATH_STORAGE_KEY, originalUri);
}

export function getOriginalUri(): string | null {
  const storage = localStorage;
  const originalUri = storage.getItem(REFERRER_PATH_STORAGE_KEY);
  return originalUri;
}

export function removeOriginalUri(): void {
  const storage = localStorage;
  storage.removeItem(REFERRER_PATH_STORAGE_KEY);
}

function isAuthenticated(userMgr: UserManager) {
  return userMgr !== null && userMgr.getUser() !== null;
}

const guardSecureRoute = async (userMgr: UserManager) => {
  if (!isAuthenticated(userMgr)) {
    if (_onAuthRequired) {
      await _onAuthRequired(userMgr)
    } else {
      await userMgr.signinRedirect()
    }
  }
}

export const navigationGuard = async (to: RouteLocationNormalized) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // track the originalUri for guardSecureRoute
    setOriginalUri(to.fullPath);

    // guard the secure route based on the authState when enter
    const isAuth = isAuthenticated(_userMgr);
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

  _userMgr = new UserManager(options);
  _onAuthRequired = options.onAuthRequired;

  // add oktaAuth instance to Vue
  app.config.globalProperties.$userMgr = _userMgr;
}

export default { install }
