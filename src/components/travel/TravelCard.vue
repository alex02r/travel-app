<script>
export default {
    name: 'TravelCard',
    props:{
        travel: Object
    },
    mounted() {
        
    },
}
</script>
<template lang="">
    <router-link :to="{ name: 'travel', params: { id: travel.id } }" class="link-underline link-underline-opacity-0">            
        <div class="card text-bg-light mb-3">
            <div class="card-header">Viaggio</div>
            <div class="card-body">
              <h5 class="card-title">{{ travel.title }}</h5>
              <p class="card-text">{{ travel.desc }}</p>
              <p class="card-text"><small class="text-body-secondary">{{ travel.date }}</small></p>
            </div>
        </div>
    </router-link>
</template>
<style lang="scss" scoped>
    .card{
        transition: all 0.2s ease-in;
    }
    .card:hover{
        transform: scale(1.05);
    }
</style>