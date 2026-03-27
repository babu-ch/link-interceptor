# vue-link-interceptor

A Vue 3 plugin that intercepts all `<a>` tag clicks in your SPA. Captures at the [capture phase](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#capture) and provides callbacks for internal and external links.

## Why?

In SPAs, plain `<a>` tags — especially those inside `v-html` or CMS-generated content — bypass Vue Router. This plugin gives you a single hook for **every** anchor click, whether internal or external, without touching individual templates.

## Install

```bash
npm install vue-link-interceptor
```

## Quick Start

```ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { linkInterceptorPlugin } from 'vue-link-interceptor'

const router = createRouter({ /* ... */ })
const app = createApp(App)

app.use(router)
app.use(linkInterceptorPlugin, {
  onInternalLink(ctx) {
    ctx.preventDefault()
    router.push(ctx.path)
  },
  onExternalLink(ctx) {
    // Rewrite URL — changes are reflected on anchor.href
    ctx.url.searchParams.set('utm_source', 'myapp')
  },
})

app.mount('#app')
```

## API

### Plugin Options

```ts
interface LinkInterceptorOptions {
  onInternalLink?: (ctx: LinkContext) => void
  onExternalLink?: (ctx: LinkContext) => void
}
```

### LinkContext

| Property | Type | Description |
|----------|------|-------------|
| `url` | `URL` | Parsed URL (mutable — changes are reflected on `anchor.href`) |
| `anchor` | `HTMLAnchorElement` | The clicked `<a>` element |
| `event` | `MouseEvent` | The original click event |
| `path` | `string` | `url.pathname + url.search + url.hash` |
| `isExternal` | `boolean` | Whether the link is external |
| `preventDefault()` | `() => void` | Cancel the default navigation |

## Behavior

- Registers a **single** listener on `document` in the **capture phase** — runs before any other click handlers
- Modifier key clicks (Ctrl, Meta, Shift, Alt) and middle-clicks are **skipped** — browser defaults are respected
- `target="_blank"` links are still intercepted — `href` rewrites are applied before the browser opens the tab
- Mutating `ctx.url` automatically updates `anchor.href`
- Calling `ctx.preventDefault()` cancels navigation
- Listener is **automatically removed** on `app.unmount()`

## Use Cases

| Use Case | Link Type | Example |
|----------|-----------|---------|
| SPA routing | Internal | Route `v-html` links through `router.push()` |
| URL rewriting | External | Append `?back=true`, `?utm_source=app` |
| Confirmation dialog | External | "You are leaving this site" prompt |
| Analytics | Both | Fire tracking events on every link click |
| Form guard | Internal | "Unsaved changes will be lost" warning |
| Security | External | Block non-allowlisted domains |
| Attribute injection | External | Auto-add `rel="noopener noreferrer"` |

## Examples

### Confirmation dialog for external links

```ts
onExternalLink(ctx) {
  ctx.preventDefault()
  if (confirm(`Navigate to ${ctx.url.hostname}?`)) {
    window.open(ctx.url.href, '_blank')
  }
}
```

### Form guard — warn on unsaved changes

```ts
onInternalLink(ctx) {
  if (formIsDirty()) {
    ctx.preventDefault()
    if (confirm('Unsaved changes will be lost. Continue?')) {
      router.push(ctx.path)
    }
    return
  }
  ctx.preventDefault()
  router.push(ctx.path)
}
```

### Security — domain allowlist + rel attribute

```ts
const allowlist = ['vuejs.org', 'github.com']

onExternalLink(ctx) {
  ctx.anchor.rel = 'noopener noreferrer'

  if (!allowlist.includes(ctx.url.hostname)) {
    ctx.preventDefault()
    alert(`${ctx.url.hostname} is blocked`)
  }
}
```

## Playground

Interactive demos are available in the `playground/` directory:

```bash
pnpm dev            # Start dev server
pnpm build:playground  # Build for GitHub Pages
```

## Development

```bash
pnpm install        # Install dependencies
pnpm test           # Run tests
pnpm build          # Build library (ESM + CJS + types)
pnpm lint           # Lint with oxlint
pnpm fmt            # Format with oxfmt
```

## License

[MIT](./LICENSE)
