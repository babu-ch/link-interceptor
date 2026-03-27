import type { Plugin } from "vue";
import { interceptLinks } from "link-interceptor";
import type { LinkInterceptorOptions } from "link-interceptor";

export const linkInterceptorPlugin: Plugin<[LinkInterceptorOptions]> = {
  install(app, options) {
    const cleanup = interceptLinks(options);
    const originalUnmount = app.unmount.bind(app);
    app.unmount = () => {
      cleanup();
      originalUnmount();
    };
  },
};
