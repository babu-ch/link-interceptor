import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "svelte-link-interceptor": fileURLToPath(
        new URL("../packages/svelte/src/index.ts", import.meta.url),
      ),
      "link-interceptor": fileURLToPath(
        new URL("../packages/core/src/index.ts", import.meta.url),
      ),
    },
  },
});
