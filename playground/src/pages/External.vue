<template>
  <div>
    <h2>External Links</h2>
    <p>
      外部リンク（別オリジン）のクリックを <code>onExternalLink</code> で捕捉。<br />
      このデモでは <code>?from=playground</code> パラメータを自動付与しています。
    </p>

    <div class="demo-section">
      <h3>外部リンク（クリックするとURLが書き換わる）</h3>
      <ul>
        <li><a href="https://example.com">example.com</a></li>
        <li><a href="https://vuejs.org">vuejs.org</a></li>
        <li><a href="https://github.com" target="_blank">github.com (target="_blank")</a></li>
      </ul>
      <p>
        <small>
          コンソールで書き換え後のURLを確認してください。<br />
          <code>target="_blank"</code> のリンクもhook対象です。
        </small>
      </p>
    </div>

    <div class="demo-section">
      <h3>Modifier Key テスト</h3>
      <p>
        <a href="https://example.com">このリンク</a> を
        Ctrl/Cmd + クリック してみてください。<br />
        modifier key 付きクリックはスキップされ、ブラウザの新規タブ動作が尊重されます。
      </p>
    </div>
  </div>
</template>
