import type { App, Plugin } from "vue";
import { interceptLinks } from "link-interceptor";
import type { LinkInterceptorOptions } from "link-interceptor";

export const linkInterceptorPlugin: Plugin<[LinkInterceptorOptions]> = {
  install(app, options) {
    const cleanup = interceptLinks(options);

    if (typeof (app as AppWithOnUnmount).onUnmount === "function") {
      // Vue 3.5+
      (app as AppWithOnUnmount).onUnmount(cleanup);
    } else {
      // Vue 3.0–3.4 fallback
      const originalUnmount = app.unmount.bind(app);
      app.unmount = () => {
        cleanup();
        originalUnmount();
      };
    }
  },
};

// app.onUnmount was added in Vue 3.5 and may not be in older type definitions
interface AppWithOnUnmount extends App {
  onUnmount(cb: () => void): void;
}
