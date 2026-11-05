export const SITE_URL = "https://babu-ch.github.io/link-interceptor";
export const SITE_NAME = "link-interceptor";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

// Shared by the router (document.title) and the build plugin (static HTML).
export const PAGES: PageMeta[] = [
  {
    path: "/",
    title: "link-interceptor: intercept all <a> tag clicks in Vue, React and Svelte SPAs",
    description:
      "Handle every <a> tag click in your SPA from one place, including links in v-html and CMS content. Framework-agnostic core with Vue, React and Svelte wrappers.",
  },
  {
    path: "/internal",
    title: "Route internal links through your SPA router | link-interceptor",
    description:
      "Demo: capture same-origin <a> clicks, including links in v-html, and turn them into router.push() navigation.",
  },
  {
    path: "/external",
    title: "Rewrite external link URLs on click | link-interceptor",
    description:
      "Demo: capture clicks on external links and rewrite their URLs, for example to add UTM parameters.",
  },
  {
    path: "/prevent",
    title: "Block link navigation | link-interceptor",
    description: "Demo: cancel navigation for selected <a> tags with ctx.preventDefault().",
  },
  {
    path: "/analytics",
    title: "Track link clicks | link-interceptor",
    description: "Demo: record internal and external link clicks in one place for analytics.",
  },
  {
    path: "/confirm",
    title: "Confirm before leaving to external sites | link-interceptor",
    description: "Demo: show a confirmation dialog before navigating to an external link.",
  },
  {
    path: "/form-guard",
    title: "Warn about unsaved form changes on link clicks | link-interceptor",
    description: "Demo: stop link navigation and warn the user when a form has unsaved changes.",
  },
  {
    path: "/security",
    title: "Domain allowlist and automatic rel attributes | link-interceptor",
    description:
      'Demo: block links to domains outside an allowlist and add rel="noopener noreferrer" automatically.',
  },
];
