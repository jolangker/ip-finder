import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImports from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    AutoImports({
      dirs: ["./src/composables"],
      imports: ["vue", "@vueuse/core", VueRouterAutoImports],
    }),
    Components({
      dirs: ["./src/components"],
    }),
  ],
});
