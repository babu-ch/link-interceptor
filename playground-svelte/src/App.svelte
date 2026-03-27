<script lang="ts">
  import { linkInterceptor } from "svelte-link-interceptor";

  let logs: string[] = $state([]);
  let currentPage: string = $state("home");

  function addLog(msg: string) {
    logs = [...logs.slice(-19), msg];
  }

  const options = {
    onInternalLink(ctx: any) {
      if (ctx.isModifierClick) return;
      ctx.preventDefault();
      addLog(`[Internal] ${ctx.path}`);
      currentPage = ctx.path === "/" ? "home" : ctx.path.slice(1);
    },
    onExternalLink(ctx: any) {
      addLog(`[External] ${ctx.url.href}`);
      ctx.url.searchParams.set("from", "svelte-playground");
      addLog(`[External] rewritten → ${ctx.url.href}`);
      ctx.anchor.target = "_blank";
    },
  };
</script>

<div class="layout" use:linkInterceptor={options}>
  <header>
    <h1>svelte-link-interceptor</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    {#if currentPage === "home"}
      <div class="page">
        <h2>Home</h2>
        <p>Svelte playground for svelte-link-interceptor.</p>
        <ul>
          <li><a href="/about">About (internal)</a></li>
          <li><a href="https://example.com">example.com (external)</a></li>
          <li><a href="https://vuejs.org">vuejs.org (external)</a></li>
        </ul>
      </div>
    {:else}
      <div class="page">
        <h2>About</h2>
        <p>This page was navigated via <code>linkInterceptor</code> action.</p>
        <a href="/">Back to Home</a>
      </div>
    {/if}
  </main>

  <div class="console">
    <h3>Console</h3>
    <div class="log-entries">
      {#each logs as log, i}
        <div class="log-entry">{log}</div>
      {/each}
      {#if logs.length === 0}
        <div class="log-empty">Click a link to see interceptor logs</div>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(*) { margin: 0; padding: 0; box-sizing: border-box; }
  :global(body) { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a2e; background: #f8f9fa; }
  .layout { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
  header { margin-bottom: 2rem; }
  header h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
  nav { display: flex; gap: 1rem; }
  nav a { color: #4361ee; text-decoration: none; }
  main { background: #fff; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  main :global(a) { color: #4361ee; }
  .page h2 { margin-bottom: 1rem; }
  .page p { margin-bottom: 0.75rem; line-height: 1.6; }
  .page ul { margin: 0.5rem 0 1rem 1.5rem; }
  .page li { margin-bottom: 0.25rem; }
  .console { background: #1a1a2e; color: #a0f0a0; border-radius: 8px; padding: 1rem; font-family: "SF Mono", Menlo, monospace; font-size: 0.8rem; }
  .console h3 { color: #888; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
  .log-entries { max-height: 200px; overflow-y: auto; }
  .log-entry { padding: 0.15rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .log-empty { color: #555; font-style: italic; }
  code { background: #f0f0f0; padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.9em; }
</style>
