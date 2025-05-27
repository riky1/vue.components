import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Qui puoi importare i file SCSS che contengono variabili globali, mixin, funzioni
        // Nota: `@use` è preferito a `@import`
        // L'uso di 'as *' qui li renderà disponibili senza namespace
        additionalData: `
          @use "@/assets/scss/utils/breakpoints" as *;
          @use "@/assets/scss/utils/functions" as *;
          @use "@/assets/scss/utils/responsive" as *;
        `
        // Se non vuoi usare 'as *', dovrai usare i namespace nei tuoi componenti,
        // es: additionalData: `@use "@/assets/scss/utils/responsive" as r;`
        // e poi `@include r.media-query(sm);` nei componenti.
      },
    },
  },
})
