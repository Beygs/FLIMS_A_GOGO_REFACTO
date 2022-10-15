import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/FLIMS_A_GOGO_REFACTO/",
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  }
})