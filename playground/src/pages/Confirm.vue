<script setup lang="ts">
</script>

<template>
  <div>
    <h2>Confirm Dialog</h2>
    <p>
      外部リンククリック時に確認ダイアログを表示する例。<br />
      「キャンセル」で遷移をブロック、「OK」で遷移を許可します。
    </p>

    <div class="demo-section">
      <h3>確認ダイアログ付きリンク</h3>
      <p>以下のリンクには <code>data-confirm</code> 属性が付いています。</p>
      <ul>
        <li>
          <a href="https://example.com" data-confirm>
            example.com（確認あり）
          </a>
        </li>
        <li>
          <a href="https://vuejs.org" data-confirm>
            vuejs.org（確認あり）
          </a>
        </li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>確認なしのリンク（通常動作）</h3>
      <ul>
        <li><a href="https://github.com">github.com（確認なし）</a></li>
        <li><a href="/internal">内部リンク（確認なし）</a></li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>実装イメージ</h3>
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
