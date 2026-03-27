import { createApp } from "vue";
import { linkInterceptorPlugin } from "vue-link-interceptor";
import App from "./App.vue";
import { i18n } from "./i18n";
import { router } from "./router";

const SECURITY_ALLOWLIST = ["vuejs.org", "github.com"];

const app = createApp(App);

app.use(router);
app.use(i18n);

app.use(linkInterceptorPlugin, {
  onInternalLink(ctx) {
    // Form Guard: 未保存チェック
    if (window.__formIsDirty?.()) {
      ctx.preventDefault();
      if (confirm("変更が失われます。移動しますか？")) {
        router.push(ctx.path);
      }
      return;
    }

    ctx.preventDefault();
    console.log("[Internal]", ctx.path);

    // Analytics: イベント記録
    pushAnalyticsEvent("internal", ctx.path);

    router.push(ctx.path);
  },

  onExternalLink(ctx) {
    // Security: rel 属性を自動付与
    ctx.anchor.rel = "noopener noreferrer";

    // Security: 許可リスト外のドメインをブロック
    if (ctx.anchor.closest("[data-security]")) {
      if (!SECURITY_ALLOWLIST.includes(ctx.url.hostname)) {
        ctx.preventDefault();
        console.log("[Blocked]", ctx.url.hostname, "is not in allowlist");
        alert(`${ctx.url.hostname} はブロックされています`);
        return;
      }
    }

    // Prevent: data-block 属性付きリンクをブロック
    if (ctx.anchor.dataset.block !== undefined) {
      ctx.preventDefault();
      console.log("[Blocked]", ctx.url.href);
      return;
    }

    // Confirm: data-confirm 属性付きリンクで確認ダイアログ
    if (ctx.anchor.dataset.confirm !== undefined) {
      ctx.preventDefault();
      console.log("[Confirm]", ctx.url.href);
      if (confirm(`${ctx.url.hostname} に移動しますか？`)) {
        window.open(ctx.url.href, "_blank");
      }
      return;
    }

    console.log("[External]", ctx.url.href);

    // Analytics: イベント記録
    pushAnalyticsEvent("external", ctx.url.href);

    // デフォルト: 外部リンクに ?from=playground パラメータを付与
    ctx.url.searchParams.set("from", "playground");
    console.log("[External] rewritten →", ctx.url.href);

    // 外部リンクは新規タブで開く（playground から離脱しない）
    ctx.anchor.target = "_blank";
  },
});

app.mount("#app");

function pushAnalyticsEvent(type: string, url: string) {
  const time = new Date().toLocaleTimeString();
  window.__analyticsEvents?.value.push({ time, type, url });
}
