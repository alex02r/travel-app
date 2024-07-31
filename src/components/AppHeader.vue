<script>
import SideMenu from './header/SideMenu.vue';

export default {
    name: 'AppHeader',
    components:{
        SideMenu
    }
}
</script>
<template lang="">
    <header>
        <div class="container py-3">
            <div class="row">
                <div class="col-4">
                    <h2 class="d-none d-md-inline">Travel App</h2>
                    <div class="d-md-none">
                        <SideMenu/>
                    </div>
                </div>
                <div class="col-8">
                    <h2 class="text-end d-md-none">Travel App</h2>

                    <ul class="list-unstyled d-none d-md-flex justify-content-end align-items-center gap-4">
                        <li class="active">Home page</li>
                        <li>Aggiungi Viaggio</li>
                        <li>I miei viaggi</li>
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
            padding: 0.5rem;
            cursor: pointer;
        }
        li:hover{
            border-radius: 50px;
            background-color: $soft-gray;
            color: $dark;
        }
        .active{
            border-radius: 50px;
            background-color: $soft-gray;
            color: $dark;
        }
    }
</style>