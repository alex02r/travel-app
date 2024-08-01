import { createRouter, createWebHistory } from "vue-router";

/* import pages */
import AppHome from "./pages/AppHome.vue";
import AppNewTravel from "./pages/AppNewTravel.vue";
import AppMyTravels from "./pages/AppMyTravels.vue";
import AppTravel from "./pages/AppTravel.vue";

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
        },
        {
            path: '/myTravels',
            name: 'myTravels',
            component: AppMyTravels,
        },
        {
            path: '/Travel/:id',
            name: 'travel',
            component: AppTravel,
        }
    ]
})

export { router };