<script>
import StarRating from "./StarRating.vue"
import { StorageService } from "../../localStorage.service";

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
            stageValue: null
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
            return
        }
    },
}
</script>
<template>
    <ol class="c-stepper">
        <li class="c-stepper__item" v-for="(stage, index) in road.stages" :key="index" :class="stage.state ? 'item-active' : ''" data-bs-toggle="modal" data-bs-target="#stageModal" @click="stageValue = stage">
            <div class="c-stepper__content">
                <h3 class="c-stepper__title" :class="stage.state ? 'content-active' : ''"><i :class="stage.state ? 'fas fa-check' : 'fas fa-xmark'"></i> {{ stage.title }}</h3>
                <div class="row align-items-center">
                    <div class="col-4">
                        <img :src="stage.img" :alt="stage.title" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <p class="c-stepper__desc" :class="stage.state ? 'content-active' : ''" style="line-height: 1.4;">{{ stage.desc }}</p>
                        <StarRating :rating="stage.rating" :readonly="true"/>
                    </div>
                </div>
            </div>
        </li>
    </ol>
    <div class="modal fade" id="stageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="stageValue">
        <div class="modal-dialog text-dark">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ stageValue.title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4 v-if="stageValue.state">Sei sicuro di voler deselezionare questa tappa ?</h4>
                    <h4 v-if="!stageValue.state">Sei sicuro di voler selezionare questa tappa come eseguita ?</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                    <button type="button" class="btn btn-warning" @click="setStep(stageValue)" data-bs-dismiss="modal">Modifica</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '/src/styles/partials/variables' as *;
  
    .c-stepper__item {
        cursor: pointer;
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
        background-color: $dark-gray;
    }
    .c-stepper__item.item-active:before {
        content: "";
        background-color: $silver-gray;
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
        background-color: $deep-gray;
    }
    .c-stepper__item.item-active:not(:last-child):after {
        content: "";
        background-color: $silver-gray;
    }
    .c-stepper__title {
        font-weight: bold;
        color: $deep-gray;
        font-size: clamp(1rem, 4vw, 1.25rem);
        margin-bottom: clamp(0.85rem, 2vmax, 1rem);
    }
    .c-stepper__desc {
        color: $deep-gray;
        font-size: clamp(0.85rem, 2vmax, 1rem);
    }
    .content-active{
        color: $silver-gray;
    }
    .c-stepper__content {
        max-width: 700px;
        color: $gray;
    }
</style>