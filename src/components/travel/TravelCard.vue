<script>
import { motionFadeUp } from '../../motions';
import { StorageService } from '../../localStorage.service';

export default {
    name: 'TravelCard',
    props:{
        travel: Object
    },
    data() {
        return {
            motionFadeUp
        }
    },
    methods: {
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
    <div v-motion="motionFadeUp">
        <div class="card shadow mb-3">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <span>Viaggio</span>
                    <div class="dropdown">
                        <a class="link-underline link-light link-underline-opacity-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
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
            </div>
            <router-link :to="{ name: 'travel', params: { id: travel.id } }" class="link-underline link-dark link-underline-opacity-0">            
                <div class="card-body">
                    <h5 class="card-title">{{ travel.title }}</h5>
                    <p class="card-text">{{ travel.desc }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ travel.date }}</small></p>
                </div>
            </router-link>
        </div>
    </div>
    <!-- modal di eliminazione del viaggio -->
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
<style lang="scss" scoped>
@use '/src/styles/partials/variables' as *;
    .card{
        background-color: $light;
    }
    .card-header{
        background-color: $dark;
        color: $light;
    }
</style>