import { UserManagerSettings, UserManager } from 'oidc-client';
import { RouteLocationNormalized } from 'vue-router';

export type OnAuthRequiredFunction = (userMgr: UserManager) => Promise<void> | void;
export type AuthRequiredFunction = (to: RouteLocationNormalized) => boolean;

export interface AuthVueOptions extends UserManagerSettings {
  authRequired: AuthRequiredFunction;
  onAuthRequired: OnAuthRequiredFunction;
  onAuthResume: OnAuthRequiredFunction;
  debug: boolean;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $userMgr: UserManager;
  }
}
