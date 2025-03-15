import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Define a pasta raiz (pode ser outra se quiser)
  

  optimizeDeps: {
    include: ['bcryptjs']
  },

  build: {
    rollupOptions: {
      input: {
        main: "./index.html", 
      },
    },

    commonjsOptions: {
      transformMixedEsModules: true
    }
  }

});
