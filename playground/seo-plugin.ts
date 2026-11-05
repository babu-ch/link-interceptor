import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { PAGES, SITE_NAME, SITE_URL, type PageMeta } from "./src/seo";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageUrl(page: PageMeta): string {
  return page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
}

function renderHead(page: PageMeta): string {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = pageUrl(page);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
  ].join("\n    ");
}

// Visible until Vue mounts, so crawlers that skip JS still get content and links.
function renderBody(page: PageMeta): string {
  const links = PAGES.map(
    (p) => `<li><a href="${pageUrl(p)}">${escapeHtml(p.title)}</a></li>`,
  ).join("");
  return [
    `<h1>${SITE_NAME}</h1>`,
    `<p>${escapeHtml(page.description)}</p>`,
    `<pre><code>npm install link-interceptor
npm install vue-link-interceptor
npm install react-link-interceptor
npm install svelte-link-interceptor</code></pre>`,
    `<ul>${links}</ul>`,
  ].join("");
}

function renderSitemap(): string {
  const urls = PAGES.map((p) => `  <url><loc>${pageUrl(p)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// Writes one HTML file per route. GitHub Pages serves /internal from internal.html,
// so deep links return 200 instead of 404.
export function seoPlugin() {
  return {
    name: "playground-seo",
    apply: "build" as const,
    enforce: "post" as const,
    async writeBundle(options: { dir?: string }) {
      const outDir = options.dir ?? "dist";
      const template = await readFile(join(outDir, "index.html"), "utf8");
      for (const page of PAGES) {
        const html = template
          .replace(/<title>.*<\/title>/, () => renderHead(page))
          .replace('<div id="app"></div>', () => `<div id="app">${renderBody(page)}</div>`);
        const file = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
        await writeFile(join(outDir, file), html);
      }
      await writeFile(join(outDir, "sitemap.xml"), renderSitemap());
    },
  };
}
