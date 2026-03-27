import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-link-interceptor": fileURLToPath(
        new URL("../packages/react/src/index.ts", import.meta.url),
      ),
      "link-interceptor": fileURLToPath(
        new URL("../packages/core/src/index.ts", import.meta.url),
      ),
    },
  },
});
