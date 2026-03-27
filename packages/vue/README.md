# vue-link-interceptor

Vue 3 plugin to intercept all `<a>` tag clicks in your SPA. Handle internal routing and external link modifications with ease.

## Install

```bash
npm install vue-link-interceptor
```

## Usage

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

## Docs & Playground

https://babu-ch.github.io/link-interceptor/?fw=vue

## License

[MIT](https://github.com/babu-ch/link-interceptor/blob/main/LICENSE)
