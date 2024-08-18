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

        },
        deleteTravel(){
            //recuperiamo l'array dei viaggi
            let travels = StorageService.getTravels();
            //cicliamo l'array
            for (let i = 0; i < travels.length; i++) {
                //controlliamo quando visualizziamo il nostro viaggio e lo eliminiamo
                if (travels[i].id == this.travel.id ) {
                    travels.splice(i, 1);
                    break;
                }
            }
            //aggiorniamo l'array
            StorageService.setTravels(travels);

            this.$router.push({ name: 'myTravels' });
            return;
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
                                <li data-bs-toggle="modal" data-bs-target="#travelModal">
                                    <a class="dropdown-item" href="#"><i class="fas fa-trash-can"></i> Elimina</a>
                                </li>
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
    <div class="modal fade" id="travelModal" tabindex="-1" aria-labelledby="travelModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-dark">
                <div class="modal-header">
                    <h4 class="modal-title" id="travelModalLabel">{{ travel.title }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p>
                        Sei sicuro di voler eliminare questo viaggio ?
                        <br>
                        <span class="stage-indicator">
                            Una volta eliminato, non potrai recuperarlo. perderai anche tutte le tappe.
                        </span>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Annulla</button>
                    <button type="button" class="btn btn-danger rounded-pill" @click="deleteTravel()" data-bs-dismiss="modal">Elimina</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">

</style>