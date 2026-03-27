<template>
  <div>
    <h2>Security</h2>
    <p>
      外部リンクに対するセキュリティ制御の例。<br />
      許可リスト制御と <code>rel</code> 属性の自動付与を組み合わせています。
    </p>

    <div class="demo-section" data-security>
      <h3>許可リスト（Allowlist）</h3>
      <p>
        許可済みドメイン: <code>vuejs.org</code>, <code>github.com</code><br />
        それ以外はブロックされます。
      </p>
      <ul>
        <li>
          <a href="https://vuejs.org">vuejs.org</a>
          <span class="status allowed">許可</span>
        </li>
        <li>
          <a href="https://github.com">github.com</a>
          <span class="status allowed">許可</span>
        </li>
        <li>
          <a href="https://suspicious-site.example.com">suspicious-site.example.com</a>
          <span class="status blocked">ブロック</span>
        </li>
        <li>
          <a href="https://unknown.example.com">unknown.example.com</a>
          <span class="status blocked">ブロック</span>
        </li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>rel 属性の自動付与</h3>
      <p>
        全ての外部リンクに <code>rel="noopener noreferrer"</code> が自動付与されます。<br />
        DevTools の Elements パネルで確認できます。
      </p>
    </div>

    <div class="demo-section">
      <h3>実装イメージ</h3>
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
