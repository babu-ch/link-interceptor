import type { LinkContext, LinkInterceptorOptions } from "./types";

/**
 * Intercept all `<a>` tag clicks on the document.
 * Returns a cleanup function that removes the listener.
 */
export function interceptLinks(options: LinkInterceptorOptions): () => void {
  const handler = createClickHandler(options);
  document.addEventListener("click", handler, true);
  return () => document.removeEventListener("click", handler, true);
}

function findAnchorFromEvent(event: Event): HTMLAnchorElement | null {
  let el = event.target as HTMLElement | null;
  while (el) {
    if (el.tagName === "A") return el as HTMLAnchorElement;
    el = el.parentElement;
  }
  return null;
}

function createClickHandler(options: LinkInterceptorOptions) {
  return (event: MouseEvent) => {
    if (event.button !== 0) return;

    const isModifierClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    const anchor = findAnchorFromEvent(event);
    if (!anchor) return;

    const href = anchor.href;
    if (!href) return;

    let url: URL;
    try {
      url = new URL(href);
    } catch {
      return;
    }

    const isExternal = url.origin !== window.location.origin;
    const ctx: LinkContext = {
      url,
      anchor,
      event,
      get path() {
        return this.url.pathname + this.url.search + this.url.hash;
      },
      isExternal,
      isModifierClick,
      preventDefault() {
        event.preventDefault();
      },
    };

    if (isExternal) {
      options.onExternalLink?.(ctx);
    } else {
      options.onInternalLink?.(ctx);
    }

    // Reflect URL mutations back to anchor.href
    if (anchor.href !== url.toString()) {
      anchor.href = url.toString();
    }
  };
}
