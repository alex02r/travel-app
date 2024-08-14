<script>
import { motionFadeIn } from '../../motions';
export default {
    name: 'HomeHero',
    data() {
        return {
            motionFadeIn
        }
    },
}
</script>
<template lang="">
    <div class="container py-5">
        <div class="row row-gap-5 justify-content-center">
            <div class="col-12">
                <div class="text-center">
                    <h1 class="mb-4">Il Tuo Diario di Viaggio Digitale</h1>
                    <p>
                        Crea itinerari dettagliati, traccia le tue tappe e rivivi ogni momento, tutto in un'unica app.
                    </p>
                </div>
            </div>
            <div class="row align-items-center justify-content-around row-gap-4">
                <div class="col-6 col-md-2 text-center" v-motion="motionFadeIn">
                    <h2>Aggiungi un viaggio alla tua lista</h2>
                    <router-link to="addTravel" class="btn btn-dark rounded-pill">
                        <i class="fas fa-arrow-up-right-from-square"></i> Inizia ora
                    </router-link>
                </div>
                <div class="col-6 col-md-2 text-center" v-motion="motionFadeIn">
                    <h2>Accedi ai tuoi viaggi anche se sei offline</h2>
                    <router-link to="myTravels" class="btn btn-dark rounded-pill">
                        <i class="fas fa-plane"></i> Viaggi
                    </router-link>
                </div>
                <div class="col-6 col-md-2 text-center" v-motion="motionFadeIn">
                    <h2>Scopri di più su Travel App</h2>
                    <router-link to="info" class="btn btn-dark rounded-pill">
                        <i class="fas fa-info"></i> Info
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>