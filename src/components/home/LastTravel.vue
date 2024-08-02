<script>
import TravelCard from '../travel/TravelCard.vue';
import travelCard from '../travel/TravelCard.vue';
export default {
    name: 'LastTravel',
    components:{
        TravelCard
    },
    data() {
        return {
            travel: {}
        }
    },
    mounted() {
        this.getLastTravel();
    },
    methods: {
        //funzione per asseggnare l'ultimo viaggio inserito
        getLastTravel(){
            //recuperiamo l'array dei viaggi
            const travelsJSON = localStorage.getItem('travels');
            const travels = travelsJSON ? JSON.parse(travelsJSON) : []; 

            if (travels.length > 0) {
                //asseggnamo il valore alla variabile travel
                this.travel = travels[travels.length - 1];
            }
        }
    },
}
</script>
<template lang="">
    <div class="container py-5">
        <div class="row">
            <div class="col-12 col-md-4 col-lg-3">
                <div class="mb-4">
                    <h2>Ultimo viaggio</h2>
                    
                </div>
                <h3  v-if="travel.length == 0">Non sono presenti dei viaggi</h3>
                <TravelCard v-else :travel="travel"/>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>