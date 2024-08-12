import { reactive } from 'vue';

export const store = reactive({
    menuList: [
        {
            name: 'home',
            label: 'Home'
        },
        {
            name: 'addTravel',
            label: 'Aggiungi Viaggio'
        },
        {
            name: 'myTravels',
            label: 'I Miei Viaggi'
        }
        ,
        {
            name: 'info',
            label: 'Info'
        }
    ]
})