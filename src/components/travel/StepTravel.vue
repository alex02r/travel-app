<script>
export default {
    name: 'StepTravel',
    props:{
        trip: Object
    }
}
</script>
<template lang="">
    <div class="row">
        <div class="col-12">
            <div class="d-flex align-items-center gap-4">
                <h2>Tappe</h2>
                <router-link :to="{ name: 'addStage', params: { id: trip.id }  }" class="btn btn-light">
                    <i class="fas fa-plus"></i>
                </router-link>
            </div>
        </div>
        <div class="col-12" v-for="(stage, index) in trip.stages" :key="index">
            
        </div>
    </div>
</template>
<style lang="">
    
</style>