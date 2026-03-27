<template>
  <div>
    <h2>{{ $t("security.title") }}</h2>
    <p>{{ $t("security.description") }}</p>

    <div class="demo-section" data-security>
      <h3>{{ $t("security.allowlist") }}</h3>
      <p>{{ $t("security.allowlistDesc", { domains: "vuejs.org, github.com" }) }}</p>
      <ul>
        <li>
          <a href="https://vuejs.org">vuejs.org</a>
          <span class="status allowed">{{ $t("security.allowed") }}</span>
        </li>
        <li>
          <a href="https://github.com">github.com</a>
          <span class="status allowed">{{ $t("security.allowed") }}</span>
        </li>
        <li>
          <a href="https://suspicious-site.example.com">suspicious-site.example.com</a>
          <span class="status blocked">{{ $t("security.blocked") }}</span>
        </li>
        <li>
          <a href="https://unknown.example.com">unknown.example.com</a>
          <span class="status blocked">{{ $t("security.blocked") }}</span>
        </li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("security.relSection") }}</h3>
      <p>{{ $t("security.relDesc") }}</p>
    </div>

    <div class="demo-section">
      <h3>{{ $t("security.implementation") }}</h3>
      <pre class="code-block">const allowlist = ['vuejs.org', 'github.com']

onExternalLink(ctx) {
  // rel 属性を自動付与
  ctx.anchor.rel = 'noopener noreferrer'

  // 許可リスト外はブロック
  if (!allowlist.includes(ctx.url.hostname)) {
    ctx.preventDefault()
    alert(`${ctx.url.hostname} はブロックされています`)
  }
}</pre>
    </div>
  </div>
</template>

<style scoped>
.status {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
}

.allowed {
  background: #d1fae5;
  color: #065f46;
}

.blocked {
  background: #fee2e2;
  color: #991b1b;
}

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
