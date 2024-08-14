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
    <!-- LOADER SECTION -->
    <section class="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center" v-if="loader">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="text-center">
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <loader/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="container py-5" v-else-if="travel">
        <div class="row">
            <div class="col-12">
                <div class="mb-4">
                    <div class="d-flex gap-4 align-items-center">
                        <h1>{{ travel.title }}</h1>
                        <div class="dropdown">
                            <a class="link-underline link-dark link-underline-opacity-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis-vertical fs-3"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <router-link :to="{ name: 'editTravel', params: { id: travel.id } }" class="dropdown-item">
                                        <i class="fa-regular fa-pen-to-square"></i> Modifica
                                    </router-link>
                                </li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-trash-can"></i> Elimina</a></li>
                            </ul>
                        </div>
                    </div>
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