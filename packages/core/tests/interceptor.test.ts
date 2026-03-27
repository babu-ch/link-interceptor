import { describe, it, expect, vi, afterEach } from "vitest";
import { interceptLinks } from "../src/interceptor";

function createAnchor(href: string): HTMLAnchorElement {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = "link";
  document.body.appendChild(a);
  return a;
}

function clickAnchor(a: HTMLAnchorElement, opts?: MouseEventInit) {
  const event = new MouseEvent("click", { bubbles: true, cancelable: true, ...opts });
  a.dispatchEvent(event);
  return event;
}

describe("interceptLinks", () => {
  let cleanups: (() => void)[] = [];

  afterEach(() => {
    cleanups.forEach((fn) => fn());
    cleanups = [];
    document.body.innerHTML = "";
  });

  it("calls onInternalLink for same-origin links", () => {
    const onInternalLink = vi.fn();
    cleanups.push(interceptLinks({ onInternalLink }));

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink).toHaveBeenCalledOnce();
    const ctx = onInternalLink.mock.calls[0][0];
    expect(ctx.isExternal).toBe(false);
    expect(ctx.path).toBe("/about");
  });

  it("calls onExternalLink for cross-origin links", () => {
    const onExternalLink = vi.fn();
    cleanups.push(interceptLinks({ onExternalLink }));

    const a = createAnchor("https://example.com/page");
    clickAnchor(a);

    expect(onExternalLink).toHaveBeenCalledOnce();
    const ctx = onExternalLink.mock.calls[0][0];
    expect(ctx.isExternal).toBe(true);
    expect(ctx.url.hostname).toBe("example.com");
  });

  it("still calls callback on modifier key clicks with isModifierClick=true", () => {
    const onInternalLink = vi.fn();
    cleanups.push(interceptLinks({ onInternalLink }));

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a, { metaKey: true });

    expect(onInternalLink).toHaveBeenCalledOnce();
    expect(onInternalLink.mock.calls[0][0].isModifierClick).toBe(true);
  });

  it("sets isModifierClick=false for normal clicks", () => {
    const onInternalLink = vi.fn();
    cleanups.push(interceptLinks({ onInternalLink }));

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink.mock.calls[0][0].isModifierClick).toBe(false);
  });

  it("skips middle-clicks (button !== 0)", () => {
    const onInternalLink = vi.fn();
    cleanups.push(interceptLinks({ onInternalLink }));

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a, { button: 1 });

    expect(onInternalLink).not.toHaveBeenCalled();
  });

  it("cancels default navigation with preventDefault()", () => {
    const onInternalLink = vi.fn((ctx) => ctx.preventDefault());
    cleanups.push(interceptLinks({ onInternalLink }));

    const a = createAnchor(`${window.location.origin}/about`);
    const event = clickAnchor(a);

    expect(event.defaultPrevented).toBe(true);
  });

  it("reflects URL mutations back to anchor.href", () => {
    const onExternalLink = vi.fn((ctx) => {
      ctx.url.searchParams.set("back", "true");
    });
    cleanups.push(interceptLinks({ onExternalLink }));

    const a = createAnchor("https://example.com/page");
    clickAnchor(a);

    expect(a.href).toContain("back=true");
  });

  it("detects parent <a> from nested element clicks", () => {
    const onInternalLink = vi.fn();
    cleanups.push(interceptLinks({ onInternalLink }));

    const a = createAnchor(`${window.location.origin}/about`);
    const span = document.createElement("span");
    span.textContent = "nested";
    a.appendChild(span);

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    span.dispatchEvent(event);

    expect(onInternalLink).toHaveBeenCalledOnce();
  });

  it("removes listener when cleanup is called", () => {
    const onInternalLink = vi.fn();
    const cleanup = interceptLinks({ onInternalLink });

    const a = createAnchor(`${window.location.origin}/about`);
    cleanup();
    clickAnchor(a);

    expect(onInternalLink).not.toHaveBeenCalled();
  });
});
