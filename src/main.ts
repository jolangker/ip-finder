import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/index.css";
import { createWebHistory, createRouter } from "vue-router/auto";
import "mapbox-gl/dist/mapbox-gl.css";

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
