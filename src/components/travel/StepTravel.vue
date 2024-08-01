<script>
export default {
    name: 'StepTravel',
    props:{
        stages: Array
    }
}
</script>
<template lang="">
    <div class="row">
        <div class="col-12">
            <div class="d-flex align-items-center gap-4">
                <h2>Tappe</h2>
                <a href="" class="btn btn-light"><i class="fas fa-plus"></i></a>
            </div>
        </div>
        <div class="col-12" v-if="stages.length == 0">
            <h4>Non sono presenti tappe</h4>
        </div>
        <div class="col-12" v-for="(stage, index) in stages" :key="index">
            
        </div>
    </div>
</template>
<style lang="">
    
</style>