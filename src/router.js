import { createRouter, createWebHistory } from "vue-router";

/* import pages */
import AppHome from "./pages/AppHome.vue";
import AppNewTravel from "./pages/AppNewTravel.vue";
import AppMyTravels from "./pages/AppMyTravels.vue";
import AppTravel from "./pages/AppTravel.vue";
import AppNewStage from "./pages/AppNewStage.vue";
import AppEditTravel from "./pages/AppEditTravel.vue";
import AppEditStage from "./pages/AppEditStage.vue";
import AppInfo from "./pages/AppInfo.vue";
import App404 from "./pages/App404.vue";

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
        },
        {
            path: '/addNewStage//:id',
            name: 'addStage',
            component: AppNewStage,
        },
        {
            path: '/editTravel/:id',
            name: 'editTravel',
            component: AppEditTravel,
        },
        {
            path: '/editStage/:travelId/:id',
            name: 'editStage',
            component: AppEditStage
        },
        {
            path: '/info',
            name: 'info',
            component: AppInfo
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: App404
        }
    ]
})

export { router };