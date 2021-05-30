import AuthVue, { navigationGuard, getOriginalUri } from './auth-vue';
import LoginCallback from './components/LoginCallback.vue';
import LogoutCallback from './components/LogoutCallback.vue';

export default AuthVue;
export { LoginCallback, LogoutCallback, navigationGuard, getOriginalUri };
export * from './types';
