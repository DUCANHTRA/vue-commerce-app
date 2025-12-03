import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import HomeView from "../views/HomeView.vue";
import NewsView from "../views/News.vue";
import AboutView from "../views/About.vue";
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/shopping",
    name: "homeview",
    component: HomeView
  },
  {
    path: "/news",
    name: "news",
    component: NewsView
  },
  {
    path: "/about",
    name: "about",
    component: AboutView
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/category/:slug",
    name: "Category",
    component: () => import("../views/CategoryView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!token;
  const isAdmin = isAuthenticated && user?.role === 'admin';

  if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' }); 
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
})

export default router;
