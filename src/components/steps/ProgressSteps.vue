<script>
import StarRating from "./StarRating.vue"
import { StorageService } from "../../localStorage.service";
import { motionFadeLeft } from "../../motions";

export default {
    name: 'ProgressSteps',
    props: {
        road: Object
    },
    components:{
        StarRating
    },
    data() {
        return {
            stageValue: null,
            motionFadeLeft
        }
    },
    methods: {
        //funzione che aggiorna lo stato della tappa
        setStep(step) {
            //andiamo a modificare lo stato della tappa
            step.state = !step.state;

            //recuperiamo l'array dei viaggi per aggiornarlo
            const travels = StorageService.getTravels();
            
            const updatedTravels = travels.map(travel => {
                if (travel.id === this.road.id) {
                    // Aggiorna gli stage del viaggio corrente
                    travel.stages = travel.stages.map(stage => 
                        stage.id === step.id ? { ...stage, state: step.state } : stage
                    );
                }
                return travel;
            });
            // Salviamo l'array aggiornato nel LocalStorage
            StorageService.setTravels(updatedTravels);
            //eseguiamo una vibrazione di 200millisecondi
            navigator.vibrate(200);
            return
        },
        deleteStage(){
            //recuperiamo l'array dei viaggi
            let travels = StorageService.getTravels();

            //modifichiamo l'array dei viaggi per eliminare lo stage
            const updatedTravels = travels.map(travel => {
                //controlliamo se sia lo stage da eliminare
                if (travel.id === this.road.id) {
                    // Filtriamo gli stage per rimuovere quello con l'ID corrispondente
                    travel.stages = travel.stages.filter(stage => stage.id !== this.stageValue.id);
                }
                return travel;
            });
            //salviamo il nuovo array
            StorageService.setTravels(updatedTravels);

            //eseguiamo una vibrazione di 200millisecondi
            navigator.vibrate(200);

            window.location.reload();
            return
        }
    },
}
</script>
<template>
    <div class="d-flex gap-4 align-items-center">
        <h2>Tappe</h2>
        <router-link :to="{ name: 'addStage', params: { id: road.id } }" class="btn btn-sm btn-dark"><i class="fas fa-plus"></i></router-link>
    </div>
    <span class="stage-indicator my-text-gray" v-if="road.stages && road.stages.length > 0">Clicca sul nome della tappa per impostare lo stato *</span>
    <ol class="c-stepper mt-4">
        <li class="c-stepper__item" v-for="(stage, index) in road.stages" :key="index" :class="stage.state ? 'item-active' : ''">
            <div class="c-stepper__content" v-motion="motionFadeLeft">
                <h3 class="c-stepper__title my-text-gray" :class="stage.state ? 'content-active' : ''">
                    <div class="d-flex gap-4">
                        <span data-bs-toggle="modal" data-bs-target="#stageModal" @click="stageValue = stage">
                            <i :class="stage.state ? 'fas fa-check' : 'fas fa-xmark'"></i> {{ stage.title }}
                        </span>
                        <div class="dropdown">
                            <a class="link-underline link-underline-opacity-0" :class="stage.state ? 'content-active' : 'my-text-gray'" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <router-link :to="{ name: 'editStage', params: { travelId: road.id , id: stage.id } }" class="dropdown-item">
                                        <i class="fa-regular fa-pen-to-square"></i> Modifica
                                    </router-link>
                                </li>
                                <li data-bs-toggle="modal" data-bs-target="#stageDeleteModal" @click="stageValue = stage">
                                    <a class="dropdown-item" href="#"><i class="fas fa-trash-can"></i> Elimina</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </h3>
                <div class="row align-items-center">
                    <div class="col-12 col-md-4">
                        <img :src="stage.img" :alt="stage.title" class="img-fluid">
                    </div>
                    <div class="col-12 col-md-6">
                        <p class="c-stepper__desc my-text-gray" :class="stage.state ? 'content-active' : ''" style="line-height: 1.4;">{{ stage.desc }}</p>
                        <StarRating :rating="stage.rating" :readonly="true"/>
                    </div>
                </div>
            </div>
        </li>
    </ol>
    <!-- modal settare lo stage -->
    <div class="modal fade" id="stageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-dark" v-if="stageValue">
                <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel">{{ stageValue.title }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p>
                        <span v-if="stageValue.state">Sei sicuro di voler deselezionare questa tappa ?</span>
                        <span v-if="!stageValue.state">Sei sicuro di voler selezionare questa tappa come eseguita ?</span>
                        <br>
                        <span class="stage-indicator">
                            Potrai sempre cambiare lo stato della tappa in qualsiasi momento vuoi.
                        </span>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Annulla</button>
                    <button type="button" class="btn btn-warning rounded-pill" @click="setStep(stageValue)" data-bs-dismiss="modal">Salva</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal per l'elimiazione della tappa -->
    <div class="modal fade" id="stageDeleteModal" tabindex="-1" aria-labelledby="stageDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-dark" v-if="stageValue">
                <div class="modal-header">
                    <h4 class="modal-title" id="stageDeleteModalLabel">{{ stageValue.title }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <p>
                        Sei sicuro di voler eliminare questa tappa ?
                        <br>
                        <span class="stage-indicator">
                            Una volta eliminata, non potrai recuperarla.
                        </span>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Annulla</button>
                    <button type="button" class="btn btn-danger rounded-pill" @click="deleteStage()" data-bs-dismiss="modal">Elimina</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '/src/styles/partials/variables' as *;
    .stage-indicator{
        font-size: 0.8rem;

    }
    .c-stepper__item {
        position: relative;
        display: flex;
        gap: 1rem;
        padding-bottom: 4rem;
    }
    .c-stepper__item:before {
        content: "";
        flex: 0 0 var(--circle-size);
        height: var(--circle-size);
        border-radius: 50%;
        background-color: $light-gray;
    }
    .c-stepper__item.item-active:before {
        content: "";
        background-color: $dark;
    }
    .c-stepper__item:not(:last-child):after {
        content: "";
        position: absolute;
        left: 0;
        top: calc(var(--circle-size) + var(--spacing));
        bottom: var(--spacing);
        z-index: -1;
        transform: translateX(calc(var(--circle-size) / 2));
        width: 2px;
        background-color: $light-gray;
    }
    .c-stepper__item.item-active:not(:last-child):after {
        content: "";
        background-color: $dark;
    }
    .c-stepper__title {
        font-weight: bold;
        cursor: pointer;
        
        font-size: clamp(1rem, 4vw, 1.25rem);
        margin-bottom: clamp(0.85rem, 2vmax, 1rem);
    }
    .c-stepper__desc {
        
        font-size: clamp(0.85rem, 2vmax, 1rem);
    }
    .content-active{
        color: $dark;
    }
    .c-stepper__content {
        max-width: 700px;
        
    }
</style>