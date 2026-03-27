export interface LinkContext {
  /** パース済みURL（変更可能、変更はanchor.hrefに反映される） */
  url: URL;
  /** クリックされた<a>要素 */
  anchor: HTMLAnchorElement;
  /** 元のクリックイベント */
  event: MouseEvent;
  /** url.pathname + url.search + url.hash */
  path: string;
  /** 外部リンクかどうか */
  isExternal: boolean;
  /** デフォルト動作をキャンセル */
  preventDefault(): void;
}

export interface LinkInterceptorOptions {
  /** 内部リンク（同一オリジン）クリック時のコールバック */
  onInternalLink?: (ctx: LinkContext) => void;
  /** 外部リンク（別オリジン）クリック時のコールバック */
  onExternalLink?: (ctx: LinkContext) => void;
}
