<template>
  <div>
    <h2>vue-link-interceptor</h2>
    <p>
      SPA内の全 <code>&lt;a&gt;</code> タグクリックをインターセプトする Vue 3 プラグイン。<br />
      capture フェーズで捕捉し、内部/外部リンクそれぞれにコールバックを提供します。
    </p>

    <div class="demo-section">
      <h3>Basic</h3>
      <ul>
        <li><a href="/internal">Internal Links</a> - 内部リンクを <code>router.push()</code> に変換</li>
        <li><a href="/external">External Links</a> - 外部リンクのURL書き換え</li>
        <li><a href="/prevent">Prevent Default</a> - リンク遷移のブロック</li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>Use Cases</h3>
      <ul>
        <li><a href="/analytics">Analytics</a> - リンククリックのトラッキング</li>
        <li><a href="/confirm">Confirm Dialog</a> - 外部サイト遷移時の確認ダイアログ</li>
        <li><a href="/form-guard">Form Guard</a> - 未保存フォームの離脱防止</li>
        <li><a href="/security">Security</a> - 許可リスト制御 + rel属性自動付与</li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>Console</h3>
      <p>画面下部のコンソールパネルにインターセプトのログが表示されます。リンクをクリックして確認してください。</p>
    </div>
  </div>
</template>
