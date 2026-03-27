<template>
  <div>
    <h2>vue-link-interceptor</h2>
    <p>
      SPA内の全 <code>&lt;a&gt;</code> タグクリックをインターセプトする Vue 3 プラグイン。<br />
      capture フェーズで捕捉し、内部/外部リンクそれぞれにコールバックを提供します。
    </p>

    <div class="demo-section">
      <h3>このPlaygroundで確認できること</h3>
      <ul>
        <li><a href="/internal">Internal Links</a> - 内部リンクを <code>router.push()</code> に変換</li>
        <li><a href="/external">External Links</a> - 外部リンクのURL書き換え</li>
        <li><a href="/prevent">Prevent Default</a> - リンク遷移のブロック</li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>基本的な使い方</h3>
      <p>下のコンソールパネルにインターセプトのログが表示されます。上のナビゲーションリンクをクリックしてみてください。</p>
    </div>
  </div>
</template>
