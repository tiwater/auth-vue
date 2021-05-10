import { OidcClientSettings, UserManager } from "oidc-client";

export type OnAuthRequiredFunction = (userMgr: UserManager) => Promise<void> | void;

export interface AuthVueOptions extends OidcClientSettings{
  onAuthRequired: OnAuthRequiredFunction;
  onAuthResume: OnAuthRequiredFunction;
  debug: boolean;
}
