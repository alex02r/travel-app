import { reactive } from 'vue';

export const store = reactive({
    menuList: [
        {
            name: 'home',
            label: 'Home Page'
        },
        {
            name: 'addTravel',
            label: 'Aggiungi Viaggio'
        },
        {
            name: 'myTravels',
            label: 'I Miei Viaggi'
        }
    ]
})