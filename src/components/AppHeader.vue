<script>
import SideMenu from './header/SideMenu.vue';
import { store } from "../store.js";

export default {
    name: 'AppHeader',
    components:{
        SideMenu
    },
    data(){
        return{
            store
        }
    }
}
</script>
<template lang="">
    <header>
        <div class="container py-3">
            <div class="row">
                <div class="col-4">
                    <h2 class="d-none d-md-inline">
                        <router-link :to="{ name: 'home' }" class="link-dark link-underline-opacity-0">
                            Travel App
                        </router-link>
                    </h2>
                    <div class="d-md-none">
                        <SideMenu/>
                    </div>
                </div>
                <div class="col-8">
                    <h2 class="text-end d-md-none">
                        <router-link :to="{ name: 'home' }" class="link-dark link-underline-opacity-0">
                            Travel App
                        </router-link>
                    </h2>

                    <ul class="list-unstyled d-none d-md-flex justify-content-end align-items-center gap-4">
                        <li v-for="(item, index) in store.menuList" ::key="index" >
                            <router-link :to="{ name: item.name }" :class="item.name == $route.name ? 'active' : ''">{{ item.label }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    
</template>
<style lang="scss" scoped>
    @use '../styles/partials/variables' as *;

    .list-unstyled{
        li{
            cursor: pointer;
        }
        li a{
            padding: 0.5rem;
            text-decoration: none;
            color: $dark;
        }
        li a:hover{
            border-radius: 50px;
            background-color: $dark;
            color: $light;
        }
        .active{
            border-radius: 50px;
            background-color: $dark;
            color: $light;
        }
    }
</style>