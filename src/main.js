import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useAppStore } from "@/libraries/app.js";
import * as PageWrapper from "@/pages/Page.vue";

import './libraries/utility.js'

export const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);

const appStore = useAppStore()

if(appStore.ui)
{
  Object.entries(appStore.ui.pages).forEach(([key, page]) => {
    router.addRoute({
      name: key,
      path: page.path || '/' + key.replace('.', '/'),
      component: PageWrapper,
      meta: {title: page.title}
      // props: route => ({
      //   pageKey: key,
      //   params: route.params
      // })
    })
  })
}
// Middleware (global guard)
router.beforeEach(async (to, from, next) => {

    // kalau belum pernah dicek → cek ke backend
    if (!appStore.isAuthChecked && appStore.token) {
        await appStore.fetchUi();
    } else {
        appStore.isAuthChecked = true;
    }

    if (to.meta.requiresAuth && !appStore.isAuthenticated) {
        next("/auth/login");
	} else if (to.meta.guestOnly && appStore.isAuthenticated) {
		next("/dashboard");
    } else {
		// hide all modal
		document.querySelectorAll(".modal.show").forEach((m) => m.classList.remove("show"));
		document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
		document.body.classList.remove("modal-open");
		document.body.style.removeProperty("overflow");
		
        next();
    }
})

router.afterEach((to) => {
  // alertStore.clearAlerts();

  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = import.meta.env.VITE_APP_TITLE;
  }
});

app.mount("#app");