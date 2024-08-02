<script>
import StarRating from './StarRating.vue';

export default {
    name: 'StepTravel',
    props:{
        trip: Object
    },
    components:{
        StarRating
    }
}
</script>
<template lang="">
    <div class="row">
        <div class="col-12">
            <div class="d-flex align-items-center gap-4 mb-4">
                <h2>Tappe</h2>
                <router-link :to="{ name: 'addStage', params: { id: trip.id }  }" class="btn btn-light">
                    <i class="fas fa-plus"></i>
                </router-link>
            </div>
        </div>
        <div class="col-12 col-md-8 col-lg-6">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item" v-for="(stage, index) in trip.stages" :key="index">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      Tappa {{ index + 1 }}
                    </button>
                  </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-6">
                                <h3>{{ stage.title }}</h3>
                                <p>
                                    {{ stage.desc }}
                                </p>
                                <StarRating :rating="stage.rating" :readonly="tru"/>
                            </div>
                            <div class="col-6">
                                <img :src="stage.img" :alt="stage.title" class="img-fluid">
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            {{ stage }}
        </div>
    </div>
</template>
<style lang="">
    
</style>