<script>
export default {
    name: 'StarRating',
    props: {
        rating: {
            type: Number,
            default: 0
        },
        maxStars: {
            type: Number,
            default: 5
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        hover: 0
        };
    },
    computed: {
        stars() {
        return Array.from({ length: this.maxStars }, (_, i) => i + 1);
        }
    },
    methods: {
        setRating(star) {
            if (!this.readonly) {
                this.$emit('update:rating', star);
            }
        },
        hoverRating(star) {
            this.hover = star;
        },
        resetHover() {
            this.hover = 0;
        }
    }
}
</script>
<template lang="">
    <div class="star-rating">
        <span 
          v-for="star in stars" 
          :key="star" 
          @click="setRating(star)"
          @mouseover="hoverRating(star)"
          @mouseleave="resetHover"
          :class="{ 'hovered': star <= hover, 'filled': star <= rating }"
        >
          ★
        </span>
      </div>
</template>
<style lang="scss" scoped>
    .star-rating {
        display: flex;
    }
    .star-rating span {
        font-size: 2em;
        cursor: pointer;
        color: lightgray;
    }
    .star-rating .filled {
        color: gold;
    }
    .star-rating .hovered {
        color: darkorange;
    }
</style>