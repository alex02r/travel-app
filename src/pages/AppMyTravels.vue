<script>
import TravelCard from '../components/travel/TravelCard.vue';

export default {
    name: 'AppMyTravels',
    components:{
        TravelCard
    },
    data() {
        return {
            travels: [],
        }
    },
    mounted() {
        this.getTravels();
    },
    methods: {
        //funzione che recupera l'array dei viaggi
        getTravels(){
            const travelsJSON = localStorage.getItem('travels');
            this.travels = travelsJSON ? JSON.parse(travelsJSON) : [];
        }
    },
}
</script>
<template lang="">
    <div class="container py-5">
        <div class="row row-gap-4">
            <div class="col-12">
                <div class="d-flex align-items-center gap-4">
                    <h1>Tutti i miei viaggi</h1>
                    <router-link to="addTravel" class="btn btn-dark"><i class="fas fa-plus"></i></router-link>
                </div>
            </div>
            <div class="col-12 col-md-4 col-lg-3" v-for="travel in travels" ::key="travel.id">
                <TravelCard :travel="travel"/>
            </div>
            <div class="col-12" v-if="travels.length == 0">
                <h3>Non ci sono viaggi da visualizzare <router-link to="addTravel" class="link-dark link-underline-opacity-25 link-underline-opacity-75-hover">aggiungine uno</router-link></h3>
            </div>
        </div>
    </div>
</template>
<style lang="">
</style>