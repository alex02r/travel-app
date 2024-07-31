import { createRouter, createWebHistory } from "vue-router";

/* import pages */
import AppHome from "./pages/AppHome.vue";
import AppNewTravel from "./pages/AppNewTravel.vue";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/addTravel',
            name: 'addTravel',
            component: AppNewTravel,
        }
    ]
})

export { router };