<script>
import Loader from "../components/Loader.vue";
import StepsMap from "../components/steps/StepsMap.vue";
import ProgressSteps from "../components/steps/ProgressSteps.vue";
import { StorageService } from "../localStorage.service";

export default {
    name: 'AppTravel',
    components:{
        Loader,
        StepsMap,
        ProgressSteps,
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
            const travels = StorageService.getTravels();

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
                    <!-- <StepTravel :trip="travel"/> -->
                     <div class="row">
                        <div class="col-12">
                            <ProgressSteps :road="travel"/>
                        </div>
                     </div>
                </div>
                <div class="">
                    <h2>Mappa</h2>
                    <StepsMap :trip="travel"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">

</style>