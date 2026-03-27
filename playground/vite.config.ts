import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-link-interceptor": fileURLToPath(
        new URL("../packages/vue/src/index.ts", import.meta.url),
      ),
      "link-interceptor": fileURLToPath(
        new URL("../packages/core/src/index.ts", import.meta.url),
      ),
    },
  },
  base: "/link-interceptor/",
});
