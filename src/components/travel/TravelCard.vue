<script>
export default {
    name: 'TravelCard',
    props:{
        travel: Object
    },
    mounted() {
        console.log(this.travel);
    },
}
</script>
<template lang="">
    <div class="card text-bg-light mb-3" style="max-width: 18rem;">
        <div class="card-header">Viaggio</div>
        <div class="card-body">
          <h5 class="card-title">{{ travel.title }}</h5>
          <p class="card-text">{{ travel.desc }}</p>
          <p class="card-text"><small class="text-body-secondary">{{ travel.date }}</small></p>
        </div>
    </div>
</template>
<style lang="">
    
</style>