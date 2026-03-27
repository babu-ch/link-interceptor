<template>
  <div>
    <h2>{{ $t("confirm.title") }}</h2>
    <p>{{ $t("confirm.description") }}</p>

    <div class="demo-section">
      <h3>{{ $t("confirm.withConfirm") }}</h3>
      <p>{{ $t("confirm.withConfirmDesc") }}</p>
      <ul>
        <li>
          <a href="https://example.com" data-confirm>
            example.com{{ $t("confirm.confirmSuffix") }}
          </a>
        </li>
        <li>
          <a href="https://vuejs.org" data-confirm>
            vuejs.org{{ $t("confirm.confirmSuffix") }}
          </a>
        </li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("confirm.withoutConfirm") }}</h3>
      <ul>
        <li>
          <a href="https://github.com">github.com{{ $t("confirm.withoutConfirmSuffix") }}</a>
        </li>
        <li><a href="/internal">{{ $t("confirm.internalLink") }}</a></li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("confirm.implementation") }}</h3>
      <pre class="code-block">onExternalLink(ctx) {
  if (ctx.anchor.dataset.confirm !== undefined) {
    ctx.preventDefault()
    if (confirm(`${ctx.url.hostname} に移動しますか？`)) {
      window.open(ctx.url.href, '_blank')
    }
  }
}</pre>
    </div>
  </div>
</template>

<style scoped>
.code-block {
  background: #1a1a2e;
  color: #a0f0a0;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  overflow-x: auto;
  line-height: 1.5;
}
</style>
