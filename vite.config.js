import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Define a pasta raiz (pode ser outra se quiser)
  build: {
    rollupOptions: {
      input: {
        main: "./index.html", 
      },
    },
  },
});
