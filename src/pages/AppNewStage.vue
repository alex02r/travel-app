<script>
import StarRating from "../components/travel/StarRating.vue";

export default {
    name: 'AppNewStage',
    components:{
        StarRating
    },
    data() {
        return {
            travelId: null,
            travel: {},
            title: '',
            address: '',
            date: '',
            desc: '',
            img: '',
            rating: 0,
            errors: {}
        }
    },
    created() {
        this.travelId = parseInt(this.$route.params.id);
        console.log('travelId: '+ this.travelId);
        console.log('router id: '+this.$route.params.id);
    },
    methods: {
        validateForm() {
            this.errors = {};
            //controllo sul titolo
            if (!this.title) {
                this.errors.title = 'Il titolo è obbligatorio.';
            }
            //controllo sull'indirizzo
            if (!this.address) {
                this.errors.address = 'L\'indirizzo è obbligatorio.';
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
            //controllo sulla valutazione
            if (this.rating === 0) { // Controllo se la valutazione è stata impostata
                this.errors.rating = 'La valutazione è obbligatoria.';
            }

            //restituisce true se non sono presenti errori
            return Object.keys(this.errors).length === 0;
        },
        generateId(){
            let stages = this.travel.stages;

            //se non essiste alcun stages l'id è 1
            let newId = 1;
            if(stages.length > 0){
                //recupero l'ultimo id e lo incremento di 1
                newId = stages[stages.length - 1].id + 1;
            }

            return newId;
        },
        getUrlImg(){
            //funzione per generare l'immagine
            //se non viene inserito alcun URL allora genera immagine di defoult
            if (!this.img) {
                return 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';
            }
            return this.img;
        },
        saveStage(){
            //effettuiamo la validazione della form
            if (this.validateForm()) {
                const newStage = {
                    id: this.generateId(),
                    title: this.title,
                    address: this.address,
                    date: this.date,
                    desc: this.desc,
                    img: this.getUrlImg(),
                    rating: this.rating
                }
                // Aggiungiamo il nuovo stage all'array stages del viaggio
                this.travel.stages.push(newStage);

                // Recuperiamo l'array dei viaggi
                const travelsJSON = localStorage.getItem('travels');
                const travels = travelsJSON ? JSON.parse(travelsJSON) : [];

                // Troviamo il viaggio corrente e lo aggiorniamo nell'array dei viaggi
                const updatedTravels = travels.map(travel => {
                    return travel.id === this.travel.id ? this.travel : travel;
                });

                // Salviamo l'array aggiornato nel LocalStorage
                localStorage.setItem('travels', JSON.stringify(updatedTravels));

                // Reindirizzamento o altro comportamento dopo il salvataggio
                this.$router.push({ name: 'travel', params: { id: this.travel.id } });
            }

        },
        addNewStage(){ 

            //recuperiamo l'array di viaggi
            const travelsJSON = localStorage.getItem('travels');
            const travels = travelsJSON ? JSON.parse(travelsJSON) : [];            
            
            //Troviamo il viaggio con l'id che abbiamo 
            this.travel = travels.find(element => element.id === this.travelId);

            if (!this.travel) {
                //se non viene trovato significa che non esiste questa pagina
                this.$router.push({ name: 'not-found' });
                return;
            }

            this.saveStage()
        }
    },
}
</script>
<template lang="">
    <div class="container py-5">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6">
                <h1>Inserisci un nuovo step </h1>
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="addNewStage()" >
                            <div class="mb-3 has-validation">
                                <label for="title" class="form-label">Nome della tappa:</label>
                                <input type="text" id="title" name="title" v-model="title" :class="{'form-control': true, 'is-invalid': errors.title}">
                                <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                            </div>
                            <div class="mb-3 has-validation">
                                <label for="address" class="form-label">Indirizzo:</label>
                                <input type="text" id="address" name="address" v-model="address" :class="{'form-control': true, 'is-invalid': errors.address}">
                                <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
                            </div>
                            <div class="mb-3 has-validation">
                                <label for="date" class="form-label">Data:</label>
                                <input type="date" id="date" name="date" v-model="date" :class="{'form-control': true, 'is-invalid': errors.date}">
                                <div v-if="errors.date" class="invalid-feedback">{{ errors.date }}</div>
                            </div>
                            <div class="mb-3 has-validation">
                                <label for="desc" class="form-label">Descrizione:</label>
                                <textarea name="desc" id="desc" v-model="desc" :class="{'form-control': true, 'is-invalid': errors.desc}">

                                </textarea>
                                <div v-if="errors.desc" class="invalid-feedback">{{ errors.desc }}</div>
                            </div>
                            <div class="mb-3 has-validation">
                                <label for="img" class="form-label">Inserisci l'URL dell'immagine:</label>
                                <input type="text" id="img" name="img" v-model="img" :class="{'form-control': true, 'is-invalid': errors.img}">
                                <div v-if="errors.img" class="invalid-feedback">{{ errors.img }}</div>
                            </div>
                            <div class="mb-3 has-validation">
                                <label class="form-label">Valutazione:</label>
                                <StarRating v-model:rating="rating" :readonly="false"/>
                                <div v-if="errors.rating" class="invalid-feedback" style="display:block">{{ errors.rating }}</div>
                            </div>
                            <button type="submit" class="btn btn-dark">Aggiungi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>