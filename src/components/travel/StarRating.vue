<script>
export default {
    name: 'StarRating',
    props: {
    maxStars: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      rating: 0,
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
      this.rating = star;
      this.$emit('update:rating', this.rating);
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