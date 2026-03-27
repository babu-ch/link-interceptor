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

function createAnchor(href: string, parent?: HTMLElement): HTMLAnchorElement {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = "link";
  (parent ?? document.body).appendChild(a);
  return a;
}

function clickAnchor(a: HTMLAnchorElement, opts?: MouseEventInit) {
  const event = new MouseEvent("click", { bubbles: true, cancelable: true, ...opts });
  a.dispatchEvent(event);
  return event;
}

describe("linkInterceptorPlugin", () => {
  let cleanup: (() => void)[] = [];

  afterEach(() => {
    cleanup.forEach((fn) => fn());
    cleanup = [];
  });

  it("calls onInternalLink for same-origin links", () => {
    const onInternalLink = vi.fn();
    const { app, root } = mountApp({ onInternalLink });
    cleanup.push(() => {
      app.unmount();
      root.remove();
    });

    const a = createAnchor(`${window.location.origin}/about`);
    cleanup.push(() => a.remove());

    clickAnchor(a);

    expect(onInternalLink).toHaveBeenCalledOnce();
    const ctx = onInternalLink.mock.calls[0][0];
    expect(ctx.isExternal).toBe(false);
    expect(ctx.path).toBe("/about");
  });

  it("calls onExternalLink for cross-origin links", () => {
    const onExternalLink = vi.fn();
    const { app, root } = mountApp({ onExternalLink });
    cleanup.push(() => {
      app.unmount();
      root.remove();
    });

    const a = createAnchor("https://example.com/page");
    cleanup.push(() => a.remove());

    clickAnchor(a);

    expect(onExternalLink).toHaveBeenCalledOnce();
    const ctx = onExternalLink.mock.calls[0][0];
    expect(ctx.isExternal).toBe(true);
    expect(ctx.url.hostname).toBe("example.com");
  });

  it("skips clicks with modifier keys", () => {
    const onInternalLink = vi.fn();
    const { app, root } = mountApp({ onInternalLink });
    cleanup.push(() => {
      app.unmount();
      root.remove();
    });

    const a = createAnchor(`${window.location.origin}/about`);
    cleanup.push(() => a.remove());

    clickAnchor(a, { metaKey: true });
    clickAnchor(a, { ctrlKey: true });
    clickAnchor(a, { shiftKey: true });
    clickAnchor(a, { altKey: true });

    expect(onInternalLink).not.toHaveBeenCalled();
  });

  it("skips middle-clicks (button !== 0)", () => {
    const onInternalLink = vi.fn();
    const { app, root } = mountApp({ onInternalLink });
    cleanup.push(() => {
      app.unmount();
      root.remove();
    });

    const a = createAnchor(`${window.location.origin}/about`);
    cleanup.push(() => a.remove());

    clickAnchor(a, { button: 1 });

    expect(onInternalLink).not.toHaveBeenCalled();
  });

  it("cancels default navigation with preventDefault()", () => {
    const onInternalLink = vi.fn((ctx) => ctx.preventDefault());
    const { app, root } = mountApp({ onInternalLink });
    cleanup.push(() => {
      app.unmount();
      root.remove();
    });

    const a = createAnchor(`${window.location.origin}/about`);
    cleanup.push(() => a.remove());

    const event = clickAnchor(a);

    expect(event.defaultPrevented).toBe(true);
  });

  it("reflects URL mutations back to anchor.href", () => {
    const onExternalLink = vi.fn((ctx) => {
      ctx.url.searchParams.set("back", "true");
    });
    const { app, root } = mountApp({ onExternalLink });
    cleanup.push(() => {
      app.unmount();
      root.remove();
    });

    const a = createAnchor("https://example.com/page");
    cleanup.push(() => a.remove());

    clickAnchor(a);

    expect(a.href).toContain("back=true");
  });

  it("detects parent <a> from nested element clicks", () => {
    const onInternalLink = vi.fn();
    const { app, root } = mountApp({ onInternalLink });
    cleanup.push(() => {
      app.unmount();
      root.remove();
    });

    const a = createAnchor(`${window.location.origin}/about`);
    const span = document.createElement("span");
    span.textContent = "nested";
    a.appendChild(span);
    cleanup.push(() => a.remove());

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    span.dispatchEvent(event);

    expect(onInternalLink).toHaveBeenCalledOnce();
  });

  it("removes listener after app.unmount()", () => {
    const onInternalLink = vi.fn();
    const { app, root } = mountApp({ onInternalLink });

    const a = createAnchor(`${window.location.origin}/about`);
    cleanup.push(() => a.remove());

    app.unmount();
    root.remove();

    clickAnchor(a);

    expect(onInternalLink).not.toHaveBeenCalled();
  });
});
