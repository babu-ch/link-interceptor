import type { Plugin } from 'vue'
import type { LinkContext, LinkInterceptorOptions } from './types'

export const linkInterceptorPlugin: Plugin<[LinkInterceptorOptions]> = {
  install(_app, options) {
    const handler = createClickHandler(options)

    document.addEventListener('click', handler, true)

    const originalUnmount = _app.unmount.bind(_app)
    _app.unmount = () => {
      document.removeEventListener('click', handler, true)
      originalUnmount()
    }
  },
}

function findAnchorFromEvent(event: Event): HTMLAnchorElement | null {
  let el = event.target as HTMLElement | null
  while (el) {
    if (el.tagName === 'A') return el as HTMLAnchorElement
    el = el.parentElement
  }
  return null
}

function createClickHandler(options: LinkInterceptorOptions) {
  return (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (event.button !== 0) return

    const anchor = findAnchorFromEvent(event)
    if (!anchor) return

    const href = anchor.href
    if (!href) return

    let url: URL
    try {
      url = new URL(href)
    } catch {
      return
    }

    const isExternal = url.origin !== window.location.origin
    let defaultPrevented = false

    const ctx: LinkContext = {
      url,
      anchor,
      event,
      get path() {
        return this.url.pathname + this.url.search + this.url.hash
      },
      isExternal,
      preventDefault() {
        defaultPrevented = true
        event.preventDefault()
      },
    }

    if (isExternal) {
      options.onExternalLink?.(ctx)
    } else {
      options.onInternalLink?.(ctx)
    }

    // コールバック内でurl が変更された場合、anchor.href に反映
    if (anchor.href !== url.toString()) {
      anchor.href = url.toString()
    }
  }
}
