import { useEffect } from "react";
import { interceptLinks, type LinkInterceptorOptions } from "link-interceptor";

/**
 * React hook that intercepts all `<a>` tag clicks.
 * Sets up on mount and cleans up on unmount.
 */
export function useLinkInterceptor(options: LinkInterceptorOptions) {
  useEffect(() => interceptLinks(options), []);
}
