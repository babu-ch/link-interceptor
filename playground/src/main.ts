import { createApp } from "vue";
import { linkInterceptorPlugin } from "vue-link-interceptor";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);

app.use(router);

app.use(linkInterceptorPlugin, {
  onInternalLink(ctx) {
    ctx.preventDefault();
    console.log("[Internal]", ctx.path);
    router.push(ctx.path);
  },
  onExternalLink(ctx) {
    // data-block 属性付きリンクは遷移をブロック
    if (ctx.anchor.dataset.block !== undefined) {
      ctx.preventDefault();
      console.log("[Blocked]", ctx.url.href);
      return;
    }
    console.log("[External]", ctx.url.href);
    // デモ: 外部リンクに ?from=playground パラメータを付与
    ctx.url.searchParams.set("from", "playground");
    console.log("[External] rewritten →", ctx.url.href);
  },
});

app.mount("#app");
