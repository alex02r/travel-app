<script>
export default {
    
}
</script>
<template lang="">
    <section class="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="text-center">
                <h2 class="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <span class="display-1 fw-bold">404</span>
                </h2>
                <h3 class="h2 mb-2">Oops! Ti sei perso.</h3>
                <p class="mb-5">La pagina che stai cercando non esiste.</p>
                <router-link :to="{ name: 'home' }" class="btn bsb-btn-5xl btn-light rounded-pill px-5 fs-6 m-0">Torna alla Home</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>
<style lang="">
    
</style>