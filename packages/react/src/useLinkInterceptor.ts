import { useEffect } from "react";
import { interceptLinks, type LinkInterceptorOptions } from "link-interceptor";

/**
 * React hook that intercepts all `<a>` tag clicks.
 * Re-registers the listener when callbacks change.
 */
export function useLinkInterceptor(options: LinkInterceptorOptions) {
  useEffect(
    () => interceptLinks(options),
    [options.onInternalLink, options.onExternalLink],
  );
}
