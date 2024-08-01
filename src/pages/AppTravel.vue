<script>
import Loader from "../components/Loader.vue";
import StepTravel from "../components/travel/StepTravel.vue";

export default {
    name: 'AppTravel',
    components:{
        Loader,
        StepTravel
    },
    data() {
        return {
            travel: {},
            loader: false
        }
    },
    mounted() {
        this.findTravel();
    },
    methods: {
        findTravel(){
            this.loader = true
            //recuperiamo l'array dei viaggi
            const travelsJSON = localStorage.getItem('travels');
            const travels = travelsJSON ? JSON.parse(travelsJSON) : [];

            const routeId = parseInt(this.$route.params.id, 10);

            //Cerchiamo nell'array il viaggio con l'id che abbiamo passato tramite parametro della rotta
            this.travel = travels.find(element => element.id === routeId);
            
            if (!this.travel) {
                this.loader = false
                // Se il viaggio non viene trovato, reindirizza alla pagina 404
                this.$router.push({ name: 'not-found' });
                
                return;
            }else{
                //impostiamo un timer per la visualizzazione del caricamento
                setTimeout(()=>{
                    this.loader = false
                }, 1000);
            }    

        }
    },
}
</script>
<template lang="">
    <div class="container py-5">
        <div class="row">
            <div class="col-12" v-if="loader">
                <Loader/>
            </div>
            <div class="col-12" v-else-if="travel">
                <div class="mb-4">
                    <h1>{{ travel.title }}</h1>
                    <h4>{{ travel.date }}</h4>
                    <p> {{ travel.desc }} </p>
                </div>
                <div class="mb-4">
                    <StepTravel :stages="travel.stages"/>
                </div>
                <h2>Mappa</h2>
            </div>
        </div>
    </div>
</template>
<style lang="">

</style>