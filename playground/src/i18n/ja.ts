export default {
  nav: {
    home: "Home",
    internal: "Internal",
    external: "External",
    prevent: "Prevent",
    analytics: "Analytics",
    confirm: "Confirm",
    formGuard: "Form Guard",
    security: "Security",
  },
  locale: {
    switch: "English",
  },
  home: {
    title: "link-interceptor",
    description:
      "SPA内の全 {tag} タグクリックをインターセプト。フレームワーク非依存のコアに Vue / React / Svelte ラッパーを提供。capture フェーズで捕捉し、内部/外部リンクそれぞれにコールバックを提供します。",
    install: "インストール",
    basic: "インタラクティブデモ",
    useCases: "Use Cases",
    console: "Console",
    consoleDescription:
      "画面下部のコンソールパネルにインターセプトのログが表示されます。リンクをクリックして確認してください。",
    internalDesc: "内部リンクを router.push() に変換",
    externalDesc: "外部リンクのURL書き換え",
    preventDesc: "リンク遷移のブロック",
    analyticsDesc: "リンククリックのトラッキング",
    confirmDesc: "外部サイト遷移時の確認ダイアログ",
    formGuardDesc: "未保存フォームの離脱防止",
    securityDesc: "許可リスト制御 + rel属性自動付与",
  },
  internal: {
    title: "Internal Links",
    description:
      "同一オリジンの {tag} タグクリックを onInternalLink で捕捉し、router.push() でSPAルーティングに変換します。",
    normalLinks: "通常のHTMLリンク（プラグインがインターセプト）",
    toHome: "Home へ",
    toExternal: "External Links へ",
    toPrevent: "Prevent Default へ",
    vhtml: "v-html 内のリンク（動的に生成されたHTMLでもインターセプト）",
    vhtmlContent:
      'これは v-html で描画されたコンテンツです: <a href="/">Home に戻る</a> | <a href="/prevent">Prevent Default を見る</a>',
    nested: "ネストされた要素",
    nestedDesc: "{tag} 内の子要素をクリックしても検出されます",
    nestedLink: "装飾されたリンク",
    routerLink: "Router Link との共存",
    routerLinkDesc:
      "<router-link> と素の <a> タグが共存できます。インターセプターは capture フェーズで両方を捕捉します。RouterLink は event.defaultPrevented を確認し、インターセプターが処理済みの場合は自身のナビゲーションをスキップします。",
    routerLinkToHome: "router-link で Home へ",
    plainLinkToExternal: "素の <a> で External Links へ",
    routerLinkNote:
      "どちらのリンクもコンソールに表示されます — インターセプターは <router-link> 由来か素の HTML かに関わらず、全ての <a> クリックを処理します。",
    routerLinkGotcha: "ハマりどころ: router-link replace",
    routerLinkGotchaDesc:
      "インターセプターは <router-link replace> のクリックも捕捉します。コールバックが ctx.preventDefault() と router.push() を呼ぶと、replace プロップが無視され、履歴が置換ではなく追加されます。",
    routerLinkReplaceBroken: "回避なし — replace が無視される（クリック後、戻るボタンで確認）",
    routerLinkReplaceFixed: "data-no-intercept 付き — replace が機能する（クリック後、戻るボタンで比較）",
    routerLinkGotchaNote:
      "1つ目のリンクは回避なし: インターセプターが preventDefault() + router.push() を呼ぶため replace が失われ、履歴が追加されます。2つ目は data-no-intercept 付き: コールバックが preventDefault() をスキップし、RouterLink が replace 付きでナビゲーションします。",
    routerLinkWorkaround:
      "回避方法: replace などのプロップを保持したい <router-link> に data-no-intercept 属性を付けます。コールバックで ctx.anchor.hasAttribute('data-no-intercept') をチェックし、ctx.preventDefault() をスキップして RouterLink にナビゲーションを任せます。実装は main.ts を参照してください。",
  },
  external: {
    title: "External Links",
    description:
      "外部リンク（別オリジン）のクリックを onExternalLink で捕捉。このデモでは ?from=playground パラメータを自動付与しています。",
    externalLinks: "外部リンク（クリックするとURLが書き換わる）",
    note: "コンソールで書き換え後のURLを確認してください。target=\"_blank\" のリンクもhook対象です。",
    modifierTest: "Modifier Key テスト",
    modifierDesc:
      "Ctrl/Cmd + クリック してみてください。modifier key 付きクリックはスキップされ、ブラウザの新規タブ動作が尊重されます。",
    thisLink: "このリンク",
  },
  prevent: {
    title: "Prevent Default",
    description:
      "コールバック内で ctx.preventDefault() を呼ぶことで、リンクの遷移をキャンセルできます。",
    normalLink: "通常の内部リンク（遷移する）",
    toHome: "Home に遷移",
    blockedLinks: "ブロック対象のリンク（遷移しない）",
    blockedDesc:
      "以下のリンクは data-block 属性が付いており、main.ts側で遷移をブロックする想定のデモです。",
    blockedLink: "blocked.example.com（クリックしても遷移しない）",
    blockedToast: "{url} への遷移をブロックしました",
  },
  analytics: {
    title: "Analytics / Tracking",
    description:
      "リンククリック時にアナリティクスイベントを発火する例。GA4 や Mixpanel への送信をイメージしています。",
    tryClick: "リンクをクリックしてみてください",
    internalLink: "内部リンク（ページ遷移）",
    anotherDemo: "別のデモページへ",
    collectedEvents: "収集されたイベント",
    time: "Time",
    type: "Type",
    url: "URL",
    noEvents: "まだイベントがありません",
  },
  confirm: {
    title: "Confirm Dialog",
    description:
      "外部リンククリック時に確認ダイアログを表示する例。「キャンセル」で遷移をブロック、「OK」で遷移を許可します。",
    withConfirm: "確認ダイアログ付きリンク",
    withConfirmDesc: "以下のリンクには data-confirm 属性が付いています。",
    confirmSuffix: "（確認あり）",
    withoutConfirm: "確認なしのリンク（通常動作）",
    withoutConfirmSuffix: "（確認なし）",
    internalLink: "内部リンク（確認なし）",
    implementation: "実装イメージ",
    confirmPrompt: "{hostname} に移動しますか？",
  },
  formGuard: {
    title: "Form Guard",
    description:
      "フォーム編集中にリンクをクリックすると「変更が失われます」と警告する例。未保存の入力がある場合のみ確認ダイアログが表示されます。",
    formSection: "フォーム（何か入力してからリンクをクリック）",
    name: "名前",
    namePlaceholder: "山田太郎",
    email: "メール",
    emailPlaceholder: "taro{'@'}example.com",
    dirty: "未保存の変更があります",
    clean: "変更なし",
    navLinks: "ナビゲーションリンク",
    navDesc: "フォームに入力がある状態でクリックすると確認ダイアログが出ます。",
    implementation: "実装イメージ",
    confirmLeave: "変更が失われます。移動しますか？",
  },
  security: {
    title: "Security",
    description:
      "外部リンクに対するセキュリティ制御の例。許可リスト制御と rel 属性の自動付与を組み合わせています。",
    allowlist: "許可リスト（Allowlist）",
    allowlistDesc: "許可済みドメイン: {domains}。それ以外はブロックされます。",
    allowed: "許可",
    blocked: "ブロック",
    relSection: "rel 属性の自動付与",
    relDesc:
      '全ての外部リンクに rel="noopener noreferrer" が自動付与されます。DevTools の Elements パネルで確認できます。',
    implementation: "実装イメージ",
    blockedAlert: "{hostname} はブロックされています",
  },
  console: {
    title: "Console",
    empty: "リンクをクリックするとインターセプトのログがここに表示されます",
  },
};
