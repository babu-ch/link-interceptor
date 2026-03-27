# svelte-link-interceptor

Svelte action to intercept all `<a>` tag clicks in your SPA. Handle internal routing and external link modifications with ease.

## Install

```bash
npm install svelte-link-interceptor
```

## Usage

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

## Docs & Playground

https://babu-ch.github.io/link-interceptor/?fw=svelte

## License

[MIT](https://github.com/babu-ch/link-interceptor/blob/main/LICENSE)
