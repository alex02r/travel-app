import { createApp } from 'vue'
import './style.css'
import { router } from './router.js'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

// Importa Bootstrap Bundle che include Popper.js
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App);

app.use(router);
app.use(MotionPlugin);

app.mount('#app')
