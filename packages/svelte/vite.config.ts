import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: {
    alias: {
      "link-interceptor": fileURLToPath(
        new URL("../core/src/index.ts", import.meta.url),
      ),
    },
  },
  pack: {
    entry: "src/index.ts",
    dts: true,
    format: ["esm", "cjs"],
    deps: {
      neverBundle: ["svelte", "link-interceptor"],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
