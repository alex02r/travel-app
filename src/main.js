import { createApp } from 'vue'
import './style.css'
import { router } from './router.js'
import App from './App.vue'

// Importa Bootstrap Bundle che include Popper.js
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(router).mount('#app')
