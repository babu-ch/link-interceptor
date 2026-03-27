# link-interceptor

Framework-agnostic core for intercepting all `<a>` tag clicks in your SPA. Provides callbacks for internal and external links with URL mutation support.

For framework-specific wrappers, see:
- [vue-link-interceptor](https://www.npmjs.com/package/vue-link-interceptor) — Vue 3 plugin
- [react-link-interceptor](https://www.npmjs.com/package/react-link-interceptor) — React hook
- [svelte-link-interceptor](https://www.npmjs.com/package/svelte-link-interceptor) — Svelte action

## Install

```bash
npm install link-interceptor
```

## Usage

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

## API

### `interceptLinks(options): () => void`

Registers a capture-phase click listener on `document`. Returns a cleanup function.

### LinkContext

| Property | Type | Description |
|----------|------|-------------|
| `url` | `URL` | Parsed URL (mutable — changes reflected on `anchor.href`) |
| `anchor` | `HTMLAnchorElement` | The clicked `<a>` element |
| `event` | `MouseEvent` | The original click event |
| `path` | `string` | `url.pathname + url.search + url.hash` |
| `isExternal` | `boolean` | Whether the link is external |
| `isModifierClick` | `boolean` | Whether Ctrl/Meta/Shift/Alt was held |
| `preventDefault()` | `() => void` | Cancel the default navigation |

## License

[MIT](https://github.com/babu-ch/link-interceptor/blob/main/LICENSE)
