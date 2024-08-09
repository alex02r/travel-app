<script>
import { StorageService } from "../localStorage.service";
import { motionFadeUp } from "../motions";

export default {
    name: 'AppNewTravel',
    data() {
        return {
            title: '',
            desc: '',
            date: '',
            errors: {},
            motionFadeUp
        }
    },
    methods: {
        //funzione per la validazione della form
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
        //funzione che genera l'id in maniera auromatica in base ai viaggi creati
        generaNuovoId() { 
            // Recupera l'array dei viaggi dal LocalStorage 
            const travels = StorageService.getTravels();

            // Se l'array è vuoto, ritorna 1 come nuovo ID 
            if (travels.length === 0) { return 1; } 
            // Altrimenti, trova l'ID dell'ultimo viaggio e incrementalo di 1 
            const lastTravel = travels[travels.length - 1]; 
            const newId = parseInt(lastTravel.id) + 1;

            return newId;
        },
        //funzione che salva nel localstorage il viaggio creato
        saveTravel() {
            if (this.validateForm()) {
                const travel = {
                    id: this.generaNuovoId(),
                    title: this.title,
                    date: this.date,
                    desc: this.desc,
                    stages: []
                };
                //recuperiamo l'array dei viaggi
                const travels = StorageService.getTravels();

                //aggiungiamo il nuovo viaggio
                travels.push(travel);
                //salviamo l'array dei viaggi
                StorageService.setTravels(travels);
                //eseguiamo una vibrazione di 200millisecondi
                navigator.vibrate(200);
                
                // Reset form
                this.title = '';
                this.date = '';
                this.desc = '';

                this.$router.push({ name: 'travel', params: { id: travel.id } });
                return
            }
        }
    },
}
</script>
<template lang="">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="mb-4">
                    <h1>Aggiungi un nuovo viaggio</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum similique non fuga ea, commodi adipisci maiores voluptatibus beatae vel, modi ipsam. Debitis doloribus, voluptatem voluptas ipsa unde iste veritatis cumque.</p>
                </div>
                <div class="card" v-motion="motionFadeUp">
                    <div class="card-body">
                        <form @submit.prevent="saveTravel()" >
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
                            <button type="submit" class="btn btn-dark rounded-pill">Aggiungi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>