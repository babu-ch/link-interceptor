import { interceptLinks, type LinkInterceptorOptions } from "link-interceptor";

/**
 * Svelte action that intercepts all `<a>` tag clicks.
 * Usage: `<div use:linkInterceptor={options}>`
 */
export function linkInterceptor(
  _node: HTMLElement,
  options: LinkInterceptorOptions,
) {
  const cleanup = interceptLinks(options);
  return { destroy: cleanup };
}
