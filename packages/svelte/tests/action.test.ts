import { describe, it, expect, vi, afterEach } from "vitest";
import { linkInterceptor } from "../src/action";

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

describe("linkInterceptor (Svelte action)", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("registers listener and intercepts clicks", () => {
    const onInternalLink = vi.fn();
    const node = document.createElement("div");
    const result = linkInterceptor(node, { onInternalLink });

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink).toHaveBeenCalledOnce();
    result.destroy();
  });

  it("removes listener on destroy", () => {
    const onInternalLink = vi.fn();
    const node = document.createElement("div");
    const result = linkInterceptor(node, { onInternalLink });

    result.destroy();

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink).not.toHaveBeenCalled();
  });
});
