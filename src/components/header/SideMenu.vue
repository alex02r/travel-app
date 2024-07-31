<script>
export default {
    name: 'SideMenu'
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
                    <li>
                        <a class="link-light link-underline-opacity-0 link-underline-opacity-75-hover" href="" ><h4>Home page</h4></a>
                    </li>
                    <li>
                        <a class="link-light link-underline-opacity-0 link-underline-opacity-75-hover" href=""><h4>Aggiungi un viaggio</h4></a>
                        
                    </li>
                    <li>
                        <a class="link-light link-underline-opacity-0 link-underline-opacity-75-hover" href=""><h4>I miei viaggi</h4></a>
                        
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
        color: $white;
        &:hover{
            color: $light-gray;
        }
    }
    .offcanvas{
        background-color: $dark;
        color: $white;
    }
    .btn-close{
        background-color: $soft-gray;
    }
    #offcanvasExampleLabel{
        color: $medium-gray;
    }
</style>