import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
//Stage 3
import moshaToast from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
//
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Bootstrap and BootstrapVue3
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { BootstrapVue3 } from 'bootstrap-vue-3'

//import "./assets/styles.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
//Stage 3

app.use(moshaToast);

app.use(vuetify);

// Use BootstrapVue3
app.use(BootstrapVue3);

app.mount("#app");
