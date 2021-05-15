import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback, navigationGuard } from 'auth-vue'
import HomeComponent from '@/components/Home.vue';
import ProfileComponent from '@/components/Profile.vue';
import MessagesComponent from '@/components/Messages.vue';
import 'semantic-ui-css/semantic.min.css'
import { nextTick } from 'vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: HomeComponent, meta: { title: 'AuthVue Demo' } },
    { path: '/login/callback', component: LoginCallback, meta: { title: 'AuthVue Callback' } },
    { path: '/profile', component: ProfileComponent, meta: { requiresAuth: true, title: 'Profile - AuthVue Demo' } },
    { path: '/messages', component: MessagesComponent, meta: { requiresAuth: true, title: 'Messages - AuthVue Demo' } },
  ]
})

router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
        document.title = to.meta.title as string || 'AuthVue Demo';
    });
});

router.beforeEach(navigationGuard)

export default router
