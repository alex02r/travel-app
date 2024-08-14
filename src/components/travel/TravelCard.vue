<script>
import { motionFadeUp } from '../../motions';

export default {
    name: 'TravelCard',
    props:{
        travel: Object
    },
    data() {
        return {
            motionFadeUp
        }
    },
}
</script>
<template lang="">
    <div v-motion="motionFadeUp">
        <div class="card shadow mb-3">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <span>Viaggio</span>
                    <div class="dropdown">
                        <a class="link-underline link-light link-underline-opacity-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link :to="{ name: 'editTravel', params: { id: travel.id } }" class="dropdown-item">
                                    <i class="fa-regular fa-pen-to-square"></i> Modifica
                                </router-link>
                            </li>
                            <li><a class="dropdown-item" href="#"><i class="fas fa-trash-can"></i> Elimina</a></li>
                        </ul>
                    </div>
                </div> 
            </div>
            <router-link :to="{ name: 'travel', params: { id: travel.id } }" class="link-underline link-dark link-underline-opacity-0">            
                <div class="card-body">
                    <h5 class="card-title">{{ travel.title }}</h5>
                    <p class="card-text">{{ travel.desc }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ travel.date }}</small></p>
                </div>
            </router-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '/src/styles/partials/variables' as *;
    .card{
        background-color: $light;
    }
    .card-header{
        background-color: $dark;
        color: $light;
    }
</style>