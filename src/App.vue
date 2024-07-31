<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components:{
    AppHeader
  }
}
</script>
<template lang="">
  <AppHeader/>
  <router-view/>
</template>
<style lang="scss">
  @use './styles/generals.scss';
</style>