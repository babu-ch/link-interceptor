# link-interceptor

Intercept all `<a>` tag clicks in your SPA. Framework-agnostic core with Vue, React, and Svelte wrappers.

## Packages

| Package | Description | |
|---------|-------------|-|
| [`link-interceptor`](./packages/core) | Framework-agnostic core | [![npm](https://img.shields.io/npm/v/link-interceptor)](https://www.npmjs.com/package/link-interceptor) |
| [`vue-link-interceptor`](./packages/vue) | Vue 3 plugin | [![npm](https://img.shields.io/npm/v/vue-link-interceptor)](https://www.npmjs.com/package/vue-link-interceptor) |
| [`react-link-interceptor`](./packages/react) | React hook | [![npm](https://img.shields.io/npm/v/react-link-interceptor)](https://www.npmjs.com/package/react-link-interceptor) |
| [`svelte-link-interceptor`](./packages/svelte) | Svelte action | [![npm](https://img.shields.io/npm/v/svelte-link-interceptor)](https://www.npmjs.com/package/svelte-link-interceptor) |

## Why?

In SPAs, plain `<a>` tags — especially those inside `v-html` or CMS-generated content — bypass your framework's router. This library gives you a single hook for **every** anchor click, whether internal or external, without touching individual templates.

## Quick Start

### Core (vanilla JS)

```ts
import { interceptLinks } from 'link-interceptor'

const cleanup = interceptLinks({
  onInternalLink(ctx) {
    ctx.preventDefault()
    history.pushState(null, '', ctx.path)
  },
  onExternalLink(ctx) {
    ctx.url.searchParams.set('utm_source', 'myapp')
  },
})

// When done:
cleanup()
```

### Vue

```ts
import { linkInterceptorPlugin } from 'vue-link-interceptor'

app.use(linkInterceptorPlugin, {
  onInternalLink(ctx) {
    ctx.preventDefault()
    router.push(ctx.path)
  },
  onExternalLink(ctx) {
    ctx.url.searchParams.set('utm_source', 'myapp')
  },
})
```

### React

```tsx
import { useLinkInterceptor } from 'react-link-interceptor'

function App() {
  useLinkInterceptor({
    onInternalLink(ctx) {
      ctx.preventDefault()
      navigate(ctx.path) // react-router
    },
    onExternalLink(ctx) {
      ctx.url.searchParams.set('utm_source', 'myapp')
    },
  })
  return <div>...</div>
}
```

### Svelte

```svelte
<script>
  import { linkInterceptor } from 'svelte-link-interceptor'

  const options = {
    onInternalLink(ctx) {
      ctx.preventDefault()
      goto(ctx.path) // SvelteKit
    },
    onExternalLink(ctx) {
      ctx.url.searchParams.set('utm_source', 'myapp')
    },
  }
</script>

<div use:linkInterceptor={options}>
  ...
</div>
```

## API

### `interceptLinks(options): () => void`

Registers a capture-phase click listener on `document`. Returns a cleanup function.

### LinkContext

| Property | Type | Description |
|----------|------|-------------|
| `url` | `URL` | Parsed URL (mutable — changes are reflected on `anchor.href`) |
| `anchor` | `HTMLAnchorElement` | The clicked `<a>` element |
| `event` | `MouseEvent` | The original click event |
| `path` | `string` | `url.pathname + url.search + url.hash` |
| `isExternal` | `boolean` | Whether the link is external |
| `isModifierClick` | `boolean` | Whether Ctrl/Meta/Shift/Alt was held |
| `preventDefault()` | `() => void` | Cancel the default navigation |

## Behavior

- **Single listener** on `document` in the **capture phase** — runs before any other click handlers
- **Modifier key clicks** (Ctrl, Meta, Shift, Alt) still fire callbacks with `isModifierClick: true` — URL rewrites work even when the browser opens a new tab
- Middle-clicks are skipped
- Mutating `ctx.url` automatically updates `anchor.href`
- Calling `ctx.preventDefault()` cancels navigation

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

## Playground

Interactive demos are available at the [playground](./playground):

```bash
pnpm dev               # Start dev server
pnpm build:playground  # Build for GitHub Pages
```

## Development

```bash
pnpm install    # Install dependencies
pnpm test       # Run all tests
pnpm build      # Build all packages
pnpm lint       # Lint all packages
```

## License

[MIT](./LICENSE)
