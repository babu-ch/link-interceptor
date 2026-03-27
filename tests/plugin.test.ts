import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createApp, defineComponent } from 'vue'
import { linkInterceptorPlugin } from '../src/plugin'

function mountApp(options: Parameters<typeof linkInterceptorPlugin.install>[1]) {
  const app = createApp(defineComponent({ template: '<div id="app"></div>' }))
  const root = document.createElement('div')
  document.body.appendChild(root)
  app.use(linkInterceptorPlugin, options)
  app.mount(root)
  return { app, root }
}

function createAnchor(href: string, parent?: HTMLElement): HTMLAnchorElement {
  const a = document.createElement('a')
  a.href = href
  a.textContent = 'link'
  ;(parent ?? document.body).appendChild(a)
  return a
}

function clickAnchor(a: HTMLAnchorElement, opts?: MouseEventInit) {
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...opts })
  a.dispatchEvent(event)
  return event
}

describe('linkInterceptorPlugin', () => {
  let cleanup: (() => void)[] = []

  afterEach(() => {
    cleanup.forEach((fn) => fn())
    cleanup = []
  })

  it('内部リンククリック時に onInternalLink が呼ばれる', () => {
    const onInternalLink = vi.fn()
    const { app, root } = mountApp({ onInternalLink })
    cleanup.push(() => { app.unmount(); root.remove() })

    const a = createAnchor(`${window.location.origin}/about`)
    cleanup.push(() => a.remove())

    clickAnchor(a)

    expect(onInternalLink).toHaveBeenCalledOnce()
    const ctx = onInternalLink.mock.calls[0][0]
    expect(ctx.isExternal).toBe(false)
    expect(ctx.path).toBe('/about')
  })

  it('外部リンククリック時に onExternalLink が呼ばれる', () => {
    const onExternalLink = vi.fn()
    const { app, root } = mountApp({ onExternalLink })
    cleanup.push(() => { app.unmount(); root.remove() })

    const a = createAnchor('https://example.com/page')
    cleanup.push(() => a.remove())

    clickAnchor(a)

    expect(onExternalLink).toHaveBeenCalledOnce()
    const ctx = onExternalLink.mock.calls[0][0]
    expect(ctx.isExternal).toBe(true)
    expect(ctx.url.hostname).toBe('example.com')
  })

  it('modifier key付きクリックはスキップされる', () => {
    const onInternalLink = vi.fn()
    const { app, root } = mountApp({ onInternalLink })
    cleanup.push(() => { app.unmount(); root.remove() })

    const a = createAnchor(`${window.location.origin}/about`)
    cleanup.push(() => a.remove())

    clickAnchor(a, { metaKey: true })
    clickAnchor(a, { ctrlKey: true })
    clickAnchor(a, { shiftKey: true })
    clickAnchor(a, { altKey: true })

    expect(onInternalLink).not.toHaveBeenCalled()
  })

  it('中クリック（button !== 0）はスキップされる', () => {
    const onInternalLink = vi.fn()
    const { app, root } = mountApp({ onInternalLink })
    cleanup.push(() => { app.unmount(); root.remove() })

    const a = createAnchor(`${window.location.origin}/about`)
    cleanup.push(() => a.remove())

    clickAnchor(a, { button: 1 })

    expect(onInternalLink).not.toHaveBeenCalled()
  })

  it('preventDefault() でデフォルト動作がキャンセルされる', () => {
    const onInternalLink = vi.fn((ctx) => ctx.preventDefault())
    const { app, root } = mountApp({ onInternalLink })
    cleanup.push(() => { app.unmount(); root.remove() })

    const a = createAnchor(`${window.location.origin}/about`)
    cleanup.push(() => a.remove())

    const event = clickAnchor(a)

    expect(event.defaultPrevented).toBe(true)
  })

  it('コールバック内でurl変更するとanchor.hrefに反映される', () => {
    const onExternalLink = vi.fn((ctx) => {
      ctx.url.searchParams.set('back', 'true')
    })
    const { app, root } = mountApp({ onExternalLink })
    cleanup.push(() => { app.unmount(); root.remove() })

    const a = createAnchor('https://example.com/page')
    cleanup.push(() => a.remove())

    clickAnchor(a)

    expect(a.href).toContain('back=true')
  })

  it('ネストされた要素のクリックでも親の<a>を検出する', () => {
    const onInternalLink = vi.fn()
    const { app, root } = mountApp({ onInternalLink })
    cleanup.push(() => { app.unmount(); root.remove() })

    const a = createAnchor(`${window.location.origin}/about`)
    const span = document.createElement('span')
    span.textContent = 'nested'
    a.appendChild(span)
    cleanup.push(() => a.remove())

    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    span.dispatchEvent(event)

    expect(onInternalLink).toHaveBeenCalledOnce()
  })

  it('app.unmount()後はリスナーが解除される', () => {
    const onInternalLink = vi.fn()
    const { app, root } = mountApp({ onInternalLink })

    const a = createAnchor(`${window.location.origin}/about`)
    cleanup.push(() => a.remove())

    app.unmount()
    root.remove()

    clickAnchor(a)

    expect(onInternalLink).not.toHaveBeenCalled()
  })
})
