import { createRouter, createWebHistory } from "vue-router";

/* import pages */
import AppHome from "./pages/AppHome.vue";

const router = createRouter({
    history: createWebHistory(),

    routers: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        }
    ]
})