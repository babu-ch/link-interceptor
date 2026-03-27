import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { useLinkInterceptor } from "../src/useLinkInterceptor";

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

function TestComponent({ onInternalLink }: { onInternalLink: () => void }) {
  useLinkInterceptor({ onInternalLink });
  return <div>test</div>;
}

describe("useLinkInterceptor (React)", () => {
  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("registers listener on mount and intercepts clicks", () => {
    const onInternalLink = vi.fn();
    render(<TestComponent onInternalLink={onInternalLink} />);

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink).toHaveBeenCalledOnce();
  });

  it("removes listener on unmount", () => {
    const onInternalLink = vi.fn();
    const { unmount } = render(<TestComponent onInternalLink={onInternalLink} />);

    unmount();

    const a = createAnchor(`${window.location.origin}/about`);
    clickAnchor(a);

    expect(onInternalLink).not.toHaveBeenCalled();
  });
});
