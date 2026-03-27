import { describe, it, expect, vi, afterEach } from "vitest";
import { createApp, defineComponent } from "vue";
import { linkInterceptorPlugin } from "../src/plugin";

function mountApp(options: Parameters<typeof linkInterceptorPlugin.install>[1]) {
  const app = createApp(defineComponent({ template: '<div id="app"></div>' }));
  const root = document.createElement("div");
  document.body.appendChild(root);
  app.use(linkInterceptorPlugin, options);
  app.mount(root);
  return { app, root };
}

function createAnchor(href: string): HTMLAnchorElement {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = "link";
  document.body.appendChild(a);
  return a;
}

function clickAnchor(a: HTMLAnchorElement) {
  const event = new MouseEvent("click", { bubbles: true, cancelable: true });
  a.dispatchEvent(event);
  return event;
}

describe("linkInterceptorPlugin (Vue)", () => {
  let cleanup: (() => void)[] = [];

  afterEach(() => {
    cleanup.forEach((fn) => fn());
    cleanup = [];
    document.body.innerHTML = "";
  });

  it("registers listener on install and intercepts clicks", () => {
    const onInternalLink = vi.fn();
    const { app, root } = mountApp({ onInternalLink });
    cleanup.push(() => { app.unmount(); root.remove(); });

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink).toHaveBeenCalledOnce();
  });

  it("removes listener after app.unmount()", () => {
    const onInternalLink = vi.fn();
    const { app, root } = mountApp({ onInternalLink });

    app.unmount();
    root.remove();

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink).not.toHaveBeenCalled();
  });
});
