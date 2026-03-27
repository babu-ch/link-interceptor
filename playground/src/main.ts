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
    // Form Guard: warn if form has unsaved changes
    if (window.__formIsDirty?.()) {
      ctx.preventDefault();
      if (confirm("Unsaved changes will be lost. Continue?")) {
        router.push(ctx.path);
      }
      return;
    }

    ctx.preventDefault();
    console.log("[Internal]", ctx.path);

    // Analytics: record event
    pushAnalyticsEvent("internal", ctx.path);

    router.push(ctx.path);
  },

  onExternalLink(ctx) {
    // Security: auto-add rel attribute
    ctx.anchor.rel = "noopener noreferrer";

    // Security: block domains not in allowlist
    if (ctx.anchor.closest("[data-security]")) {
      if (!SECURITY_ALLOWLIST.includes(ctx.url.hostname)) {
        ctx.preventDefault();
        console.log("[Blocked]", ctx.url.hostname, "is not in allowlist");
        alert(`${ctx.url.hostname} is blocked`);
        return;
      }
    }

    // Prevent: block links with data-block attribute
    if (ctx.anchor.dataset.block !== undefined) {
      ctx.preventDefault();
      console.log("[Blocked]", ctx.url.href);
      return;
    }

    // Confirm: show confirmation dialog for data-confirm links
    if (ctx.anchor.dataset.confirm !== undefined) {
      ctx.preventDefault();
      console.log("[Confirm]", ctx.url.href);
      if (confirm(`Navigate to ${ctx.url.hostname}?`)) {
        window.open(ctx.url.href, "_blank");
      }
      return;
    }

    console.log("[External]", ctx.url.href);

    // Analytics: record event
    pushAnalyticsEvent("external", ctx.url.href);

    // Default: append ?from=playground to external links
    ctx.url.searchParams.set("from", "playground");
    console.log("[External] rewritten →", ctx.url.href);

    // Open external links in new tab (don't leave playground)
    ctx.anchor.target = "_blank";
  },
});

app.mount("#app");

function pushAnalyticsEvent(type: string, url: string) {
  const time = new Date().toLocaleTimeString();
  window.__analyticsEvents?.value.push({ time, type, url });
}
