<script>
import StarRating from "./StarRating.vue"
export default {
    name: 'ProgressSteps',
    props: {
        road: Object
    },
    components:{
        StarRating
    },
    data() {
        return {
            currentStep: 0
        }
    },
    methods: {
        setStep(index) {
            this.currentStep = index;
        }
    },
}
</script>
<template>
    <div class="wrapper">
        <ol class="c-stepper">
          <li class="c-stepper__item item-active" v-for="(stage, index) in road.stages" :key="index">
            <div class="c-stepper__content">
              <h3 class="c-stepper__title">{{ stage.title }}</h3>
              <div class="row align-items-center">
                    <div class="col-4">
                      <img :src="stage.img" :alt="stage.title" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <p class="c-stepper__desc" style="line-height: 1.4;">{{ stage.desc }}</p>
                        <StarRating :rating="stage.rating" :readonly="true"/>
                    </div>
              </div>
            </div>
          </li>
          <li class="c-stepper__item" v-for="(stage, index) in road.stages" :key="index">
            <div class="c-stepper__content">
              <h3 class="c-stepper__title">{{ stage.title }}</h3>
              <div class="row align-items-center">
                    <div class="col-4">
                      <img :src="stage.img" :alt="stage.title" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <p class="c-stepper__desc" style="line-height: 1.4;">{{ stage.desc }}</p>
                        <StarRating :rating="stage.rating" :readonly="true"/>
                    </div>
              </div>
            </div>
          </li>
        </ol>
    </div>
</template>
<style lang="scss" scoped>
@use '/src/styles/partials/variables' as *;
  
    .c-stepper__item {
        position: relative;
        display: flex;
        gap: 1rem;
        padding-bottom: 4rem;
    }
    .c-stepper__item:before {
        content: "";
        flex: 0 0 var(--circle-size);
        height: var(--circle-size);
        border-radius: 50%;
        background-color: lightgrey;
    }
    .c-stepper__item.item-active:before {
        content: "";
        background-color: $dark-gray;
    }
    .c-stepper__item:not(:last-child):after {
        content: "";
        position: absolute;
        left: 0;
        top: calc(var(--circle-size) + var(--spacing));
        bottom: var(--spacing);
        z-index: -1;
        transform: translateX(calc(var(--circle-size) / 2));
        width: 2px;
        background-color: #e0e0e0;
    }
    .c-stepper__item.item-active:not(:last-child):after {
        content: "";
        background-color: $deep-gray;
    }
    .c-stepper__title {
        font-weight: bold;
        font-size: clamp(1rem, 4vw, 1.25rem);
        margin-bottom: clamp(0.85rem, 2vmax, 1rem);
    }
    
    .c-stepper__desc {
        color: grey;
        font-size: clamp(0.85rem, 2vmax, 1rem);
    }
    
    .c-stepper__content {
        max-width: 700px;
    }
    
    /*** Non-demo CSS ***/
    .wrapper {
        max-width: 1000px;
        margin: 2rem auto 0;
    }
</style>