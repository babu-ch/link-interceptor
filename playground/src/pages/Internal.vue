<template>
  <div>
    <h2>Internal Links</h2>
    <p>
      同一オリジンの <code>&lt;a&gt;</code> タグクリックを <code>onInternalLink</code> で捕捉し、
      <code>router.push()</code> でSPAルーティングに変換します。
    </p>

    <div class="demo-section">
      <h3>通常のHTMLリンク（プラグインがインターセプト）</h3>
      <ul>
        <li><a href="/">Home へ</a></li>
        <li><a href="/external">External Links へ</a></li>
        <li><a href="/prevent">Prevent Default へ</a></li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>v-html 内のリンク（動的に生成されたHTMLでもインターセプト）</h3>
      <div v-html="dynamicHtml"></div>
    </div>

    <div class="demo-section">
      <h3>ネストされた要素</h3>
      <p>
        <a href="/external"><strong><em>装飾されたリンク</em></strong></a>
        - <code>&lt;a&gt;</code> 内の子要素をクリックしても検出されます
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const dynamicHtml = `
  <p>これは <code>v-html</code> で描画されたコンテンツです:
    <a href="/">Home に戻る</a> |
    <a href="/prevent">Prevent Default を見る</a>
  </p>
`;
</script>
