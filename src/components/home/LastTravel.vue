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
            travel: null
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
            
            return
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
                <TravelCard v-if="travel != null" :travel="travel"/>
                <h4 v-else>Non sono presenti dei viaggi</h4>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>