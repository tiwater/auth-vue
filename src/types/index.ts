import { OidcClientSettings, UserManager } from 'oidc-client';
import { RouteLocationNormalized } from 'vue-router';

export type OnAuthRequiredFunction = (userMgr: UserManager) => Promise<void> | void;
export type AuthRequiredFunction = (to: RouteLocationNormalized) => boolean;

export interface AuthVueOptions extends OidcClientSettings {
  authRequired: AuthRequiredFunction;
  onAuthRequired: OnAuthRequiredFunction;
  onAuthResume: OnAuthRequiredFunction;
  debug: boolean;
}
