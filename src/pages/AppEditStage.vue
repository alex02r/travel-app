<script>
import StarRating from '../components/steps/StarRating.vue';
import { StorageService } from '../localStorage.service';

export default {
    name: 'AppEditStage',
    components:{
        StarRating
    },
    data() {
        return {
            travel: {},
            stage: {},
            title: '',
            address: '',
            date: '',
            desc: '',
            img: '',
            rating: 0,
            errors: {},
            modify: false
        }
    },
    created() {
        this.checkStage();
    },
    methods: {
        checkStage(){
            const travels = StorageService.getTravels();

            //recuperiamo i parametri della rotta
            const travelId = parseInt(this.$route.params.travelId);
            const stageId = parseInt(this.$route.params.id);

            //Cerchiamo nell'array il viaggio con l'id che abbiamo passato tramite parametro della rotta
            this.travel = travels.find(element => element.id === travelId);
            //Cerchiamo nell'arrai delle tappe la tappa con l'id che abbiamo passato alla rotta
            this.stage = this.travel.stages.find(element => element.id === stageId)

            if (!this.travel || !this.stage) {
                this.$router.push({ name: 'not-found' });
            }

            this.title = this.stage.title 
            this.desc = this.stage.desc
            this.date = this.stage.date
            this.img = this.stage.img
            this.address = this.stage.address
            this.rating = this.stage.rating

            return;
        },
        checkOldValue(){
            if (this.title == this.stage.title && this.address === this.stage.address && this.date === this.stage.date && this.desc === this.stage.desc && this.img === this.stage.img && this.rating === this.stage.rating) {
                this.modify = false
            }else{
                this.modify = true
            }
        },
        getUrlImg(){
            if (!this.img) {
                return 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';
            }
            return this.img;
        },
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
        editStage(){
            if (this.validateForm() && this.modify) {
                const editedStage = {
                    id: this.stage.id,
                    title: this.title,
                    address: this.address,
                    date: this.date,
                    desc: this.desc,
                    img: this.getUrlImg(),
                    rating: this.rating
                }
                
                const stages = this.travel.stages;
                // Troviamo il viaggio corrente e lo aggiorniamo nell'array dei viaggi
                const editedStages = stages.map(stage => {
                    return stage.id === this.stage.id ? editedStage : stage;
                });
                
                this.travel.stages = editedStages;
                // Recuperiamo l'array dei viaggi
                const travels = StorageService.getTravels();
                const editedTravels = travels.map(travel => {
                    return travel.id === this.travel.id ? this.travel : travel;
                });

                // Salviamo l'array aggiornato nel LocalStorage
                StorageService.setTravels(editedTravels);

                this.$router.push({ name: 'travel', params:{ id: this.travel.id } });
                return;
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
        address() {
            this.checkOldValue();
        },
        img() {
            this.checkOldValue();
        },
        rating() {
            this.checkOldValue();
        },
    }
}
</script>
<template lang="">
    <div class="contaienr">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <h1 class="text-center">Modifica la Tappa</h1>
                <div class="card shadow border-0">
                    <div class="card-body">
                        <form @submit.prevent="editStage()">
                            <div class="mb-4 row align-items-center has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="title" class="form-label">Nome della tappa:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <input type="text" id="title" name="title" v-model="title" :class="{'form-control': true, 'is-invalid': errors.title}">
                                    <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                                </div>
                            </div>
                            <div class="mb-4 row align-items-center has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="address" class="form-label">Indirizzo:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <input type="text" id="address" name="address" v-model="address" :class="{'form-control': true, 'is-invalid': errors.address}">
                                    <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
                                </div>
                            </div>
                            <div class="mb-4 row align-items-center has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="date" class="form-label">Data:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <input type="date" id="date" name="date" v-model="date" :class="{'form-control': true, 'is-invalid': errors.date}">
                                    <div v-if="errors.date" class="invalid-feedback">{{ errors.date }}</div>
                                </div>
                            </div>
                            <div class="mb-4 row align-items-center has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="desc" class="form-label">Descrizione:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <textarea name="desc" id="desc" v-model="desc" :class="{'form-control': true, 'is-invalid': errors.desc}">
    
                                    </textarea>
                                    <div v-if="errors.desc" class="invalid-feedback">{{ errors.desc }}</div>
                                </div>
                            </div>
                            <div class="mb-4 row align-items-center has-validation">
                                <div class="col-12 col-md-4">
                                    <label for="img" class="form-label">Inserisci l'URL dell'immagine:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <input type="text" id="img" name="img" v-model="img" :class="{'form-control': true, 'is-invalid': errors.img}">
                                    <div v-if="errors.img" class="invalid-feedback">{{ errors.img }}</div>
                                </div>
                            </div>
                            <div class="mb-4 row align-items-center has-validation">
                                <div class="col-12 col-md-4">
                                    <label class="form-label">Valutazione:</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <StarRating v-model:rating="rating" :readonly="false"/>
                                    <div v-if="errors.rating" class="invalid-feedback" style="display:block">{{ errors.rating }}</div>
                                </div>
                            </div>
                            <div class="d-flex gap-3">
                                <button type="submit" class="btn btn-dark rounded-pill" :disabled="!modify" >Aggiungi</button>
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