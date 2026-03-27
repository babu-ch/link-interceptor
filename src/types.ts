export interface LinkContext {
  /** Parsed URL (mutable — changes are reflected on `anchor.href`) */
  url: URL;
  /** The clicked `<a>` element */
  anchor: HTMLAnchorElement;
  /** The original click event */
  event: MouseEvent;
  /** `url.pathname + url.search + url.hash` */
  path: string;
  /** Whether the link is external (different origin) */
  isExternal: boolean;
  /** Cancel the default navigation */
  preventDefault(): void;
}

export interface LinkInterceptorOptions {
  /** Called when an internal (same-origin) link is clicked */
  onInternalLink?: (ctx: LinkContext) => void;
  /** Called when an external (different-origin) link is clicked */
  onExternalLink?: (ctx: LinkContext) => void;
}
