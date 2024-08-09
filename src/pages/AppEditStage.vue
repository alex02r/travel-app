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
            return;
        }
    },
}
</script>
<template lang="">
    <div class="contaienr">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <h1 class="text-center">Modifica la Tappa</h1>
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="">
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