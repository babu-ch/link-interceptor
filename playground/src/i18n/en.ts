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
    switch: "日本語",
  },
  home: {
    title: "vue-link-interceptor",
    description:
      "A Vue 3 plugin that intercepts all {tag} tag clicks in your SPA. Captures at the capture phase and provides callbacks for internal/external links.",
    basic: "Basic",
    useCases: "Use Cases",
    console: "Console",
    consoleDescription:
      "Interceptor logs appear in the console panel at the bottom. Click a link to see them.",
    internalDesc: "Convert internal links to router.push()",
    externalDesc: "Rewrite external link URLs",
    preventDesc: "Block link navigation",
    analyticsDesc: "Track link clicks",
    confirmDesc: "Confirmation dialog for external navigation",
    formGuardDesc: "Prevent navigation with unsaved form changes",
    securityDesc: "Domain allowlist + auto rel attribute",
  },
  internal: {
    title: "Internal Links",
    description:
      "Captures same-origin {tag} tag clicks with onInternalLink and converts them to SPA routing via router.push().",
    normalLinks: "Normal HTML links (intercepted by plugin)",
    toHome: "Go to Home",
    toExternal: "Go to External Links",
    toPrevent: "Go to Prevent Default",
    vhtml: "Links in v-html (dynamically generated HTML is also intercepted)",
    vhtmlContent:
      'This is content rendered with v-html: <a href="/">Back to Home</a> | <a href="/prevent">See Prevent Default</a>',
    nested: "Nested elements",
    nestedDesc: "Clicks on child elements inside {tag} are also detected",
    nestedLink: "Decorated link",
  },
  external: {
    title: "External Links",
    description:
      "Captures external link (different origin) clicks with onExternalLink. This demo automatically appends ?from=playground parameter.",
    externalLinks: "External links (URL is rewritten on click)",
    note: 'Check the rewritten URL in the console. Links with target="_blank" are also hooked.',
    modifierTest: "Modifier Key Test",
    modifierDesc:
      "Try Ctrl/Cmd + Click. Modifier key clicks are skipped, respecting the browser's new tab behavior.",
    thisLink: "this link",
  },
  prevent: {
    title: "Prevent Default",
    description:
      "Call ctx.preventDefault() in the callback to cancel link navigation.",
    normalLink: "Normal internal link (navigates)",
    toHome: "Navigate to Home",
    blockedLinks: "Blocked links (no navigation)",
    blockedDesc:
      "The following links have a data-block attribute. The demo blocks navigation in main.ts.",
    blockedLink: "blocked.example.com (click does not navigate)",
    blockedToast: "Blocked navigation to {url}",
  },
  analytics: {
    title: "Analytics / Tracking",
    description:
      "Example of firing analytics events on link clicks. Imagine sending to GA4 or Mixpanel.",
    tryClick: "Try clicking these links",
    internalLink: "Internal link (page navigation)",
    anotherDemo: "Go to another demo page",
    collectedEvents: "Collected events",
    time: "Time",
    type: "Type",
    url: "URL",
    noEvents: "No events yet",
  },
  confirm: {
    title: "Confirm Dialog",
    description:
      'Shows a confirmation dialog on external link click. "Cancel" blocks navigation, "OK" allows it.',
    withConfirm: "Links with confirmation dialog",
    withConfirmDesc:
      "The following links have a data-confirm attribute.",
    confirmSuffix: " (with confirm)",
    withoutConfirm: "Links without confirmation (normal behavior)",
    withoutConfirmSuffix: " (no confirm)",
    internalLink: "Internal link (no confirm)",
    implementation: "Implementation example",
    confirmPrompt: "Navigate to {hostname}?",
  },
  formGuard: {
    title: "Form Guard",
    description:
      'Shows a "changes will be lost" warning when clicking a link while editing a form. The dialog only appears when there are unsaved inputs.',
    formSection: "Form (type something then click a link)",
    name: "Name",
    namePlaceholder: "John Doe",
    email: "Email",
    emailPlaceholder: "john{'@'}example.com",
    dirty: "Unsaved changes",
    clean: "No changes",
    navLinks: "Navigation links",
    navDesc:
      "A confirmation dialog appears when clicking with unsaved form input.",
    implementation: "Implementation example",
    confirmLeave: "Changes will be lost. Navigate anyway?",
  },
  security: {
    title: "Security",
    description:
      "Security controls for external links. Combines domain allowlist with automatic rel attribute.",
    allowlist: "Allowlist",
    allowlistDesc:
      "Allowed domains: {domains}. All others are blocked.",
    allowed: "Allowed",
    blocked: "Blocked",
    relSection: "Auto rel attribute",
    relDesc:
      'All external links automatically get rel="noopener noreferrer". Check in DevTools Elements panel.',
    implementation: "Implementation example",
    blockedAlert: "{hostname} is blocked",
  },
  console: {
    title: "Console",
    empty: "Click a link to see interceptor logs here",
  },
};
