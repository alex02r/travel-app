<script>
import { store } from '../../store';
export default {
    name: 'SideMenu',
    data() {
        return {
            store
        }
    },
}
</script>
<template lang="">
    <div>
        <h1>
            <a class="my-link" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <i class="fas fa-bars"></i>
            </a>
        </h1>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
              <h3 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h3>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <div>
               <ul class="list-unstyled d-flex flex-column gap-4">
                    <li v-for="(item, index) in store.menuList" ::key="index" >
                        <router-link :to="{ name: item.name }" class="link-light link-underline-opacity-75-hover" :class="item.name == $route.name ? 'link-underline-opacity-75 ' : 'link-underline-opacity-0 '">
                            <h4 data-bs-dismiss="offcanvas">{{ item.label }}</h4>
                        </router-link>
                    </li>
               </ul>
              </div>
            </div>
          </div>
    </div>
</template>
<style lang="scss" scoped>
    @use './src/styles/partials/variables' as *;
    .my-link{
        text-decoration: none;
        color: $dark;
        &:hover{
            color: $gray;
        }
    }
    .offcanvas{
        background-color: $dark;
        color: $light;
    }
    .btn-close{
        background-color: $medium;
    }
    #offcanvasExampleLabel{
        color: $medium;
    }
</style>