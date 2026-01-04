import { createRouter, createWebHistory } from "vue-router";
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

import Login from "@/pages/Auth/Login.vue";
import ForgotPassword from "@/pages/Auth/ForgotPassword.vue";
import ResetPassword from "@/pages/Auth/ResetPassword.vue";
import Dashboard from "@/pages/Dashboard.vue";
import NotFound from "@/pages/NotFound.vue";
import Page from "@/pages/Page.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: Admin,
    meta: { requiresAuth: true }, // Proteksi
    children: [
      { path: "dashboard", name: 'dashboard', component: Dashboard, meta: {title: 'Dashboard'}},
    ]
  },
  {
    path: "/page",
    component: Admin,
    meta: { requiresAuth: true }, // Proteksi
    children: [
      { path: ":pathMatch(.*)*", name: 'page', component: Page, meta: {title: 'Page'}},
    ]
  },
  {
    path: "/auth",
    component: Auth,
    meta: { guestOnly: true },
    children: [
      { path: "login", component: Login, meta: {title: 'Login' }},
      { path: "forgot-password", component: ForgotPassword, meta: {title: 'Lupa Kata Sandi' }},
      { path: "reset-password/:token", component: ResetPassword, meta: {title: 'Reset Kata Sandi' }},
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;