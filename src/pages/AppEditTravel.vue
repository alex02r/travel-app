<script>
import { StorageService } from '../localStorage.service';
import { motionFadeLeft } from '../motions';

export default {
    name: 'AppEditTravel',
    data() {
        return {
            motionFadeLeft,
            travel: null,
            title: '',
            desc: '',
            date: '',
            errors: {},
            modify: false
        }
    },
    created() {
        this.setTravel();
        this.checkOldValue()
    },
    methods: {
        setTravel(){
            //recuperiamo l'array dei viaggi
            const travels = StorageService.getTravels();

            const routeId = parseInt(this.$route.params.id);

            this.travel = travels.find(element => element.id === routeId);
            
            if (!this.travel) {
                // Se il viaggio non viene trovato, reindirizza alla pagina 404
                this.$router.push({ name: 'not-found' });
                return;
            }

            this.title = this.travel.title 
            this.desc = this.travel.desc
            this.date = this.travel.date

            return;
        },
        checkOldValue(){
            if (this.title == this.travel.title && this.date === this.travel.date && this.desc === this.travel.desc ) {
                this.modify = false
            }else{
                this.modify = true
            }
        },
        validateForm() {
            this.errors = {};
            //controllo sul titolo
            if (!this.title) {
                this.errors.title = 'Il titolo è obbligatorio.';
            }
            //controlli sulla data
            if (!this.date) {
                this.errors.date = 'La data è obbligatoria.';
            }
            if (isNaN(Date.parse(this.date))) {
                this.errors.date = 'Inserisci una data valida.';
            }
            //controllo sulla descrizione
            if (!this.desc) {
                this.errors.desc = 'La descrizione è obbligatoria.';
            }

            //restituisce true se non sono presenti errori
            return Object.keys(this.errors).length === 0;
        },
        findTravel(){
            if (this.validateForm() && this.modify ) {
                const editedTravel = {
                    id: this.travel.id,
                    title: this.title,
                    date: this.date,
                    desc: this.desc,
                    stages: this.travel.stages
                }
                // Recuperiamo l'array dei viaggi
                const travels = StorageService.getTravels();

                // Troviamo il viaggio corrente e lo aggiorniamo nell'array dei viaggi
                const updatedTravels = travels.map(travel => {
                    return travel.id === this.travel.id ? editedTravel : travel;
                });

                // Salviamo l'array aggiornato nel LocalStorage
                StorageService.setTravels(updatedTravels);
            }
        }
    },
    watch: {
        title() {
            this.checkOldValue();
        },
        date() {
            this.checkOldValue();
        },
        desc() {
            this.checkOldValue();
        },
    }
}
</script>
<template lang="">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="mb-4">
                    <h1>Modifica</h1>
                </div>
                <div class="card" v-motion="motionFadeLeft">
                    <div class="card-body">
                        <form @submit.prevent="editTravel()" >
                            <div class="mb-4 row has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="title" class="form-label">Titlolo del viaggio:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <input type="text" id="title" name="title" v-model="title" :class="{'form-control': true, 'is-invalid': errors.title}">
                                    <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                                </div>
                            </div>
                            <div class="mb-4 row has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="date" class="form-label">Data:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <input type="date" id="date" name="date" v-model="date" :class="{'form-control': true, 'is-invalid': errors.date}">
                                    <div v-if="errors.date" class="invalid-feedback">{{ errors.date }}</div>
                                </div>
                            </div>
                            <div class="mb-4 row has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="desc" class="form-label">Descrizione:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <textarea name="desc" id="desc" v-model="desc" :class="{'form-control': true, 'is-invalid': errors.desc}">

                                    </textarea>
                                    <div v-if="errors.desc" class="invalid-feedback">{{ errors.desc }}</div>
                                </div>
                            </div>
                            <div class="d-flex gap-4">
                                <button type="submit" class="btn btn-warning rounded-pill" :disabled="!modify">Modifica</button>
                                <router-link :to="{ name: 'travel', params: { id: travel.id } }" class="btn btn-dark rounded-pill">Annulla</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>