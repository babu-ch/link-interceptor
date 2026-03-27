# react-link-interceptor

React hook to intercept all `<a>` tag clicks in your SPA. Handle internal routing and external link modifications with ease.

## Install

```bash
npm install react-link-interceptor
```

## Usage

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

## Docs & Playground

https://babu-ch.github.io/link-interceptor/?fw=react

## License

[MIT](https://github.com/babu-ch/link-interceptor/blob/main/LICENSE)
