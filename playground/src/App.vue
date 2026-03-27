<script setup lang="ts">
import { ref } from "vue";

const logs = ref<string[]>([]);

const originalLog = console.log;
console.log = (...args: unknown[]) => {
  originalLog(...args);
  const msg = args.map(String).join(" ");
  if (msg.startsWith("[")) {
    logs.value.push(msg);
    if (logs.value.length > 20) logs.value.shift();
  }
};
</script>

<template>
  <div class="layout">
    <header>
      <h1>vue-link-interceptor</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/internal">Internal Links</a>
        <a href="/external">External Links</a>
        <a href="/prevent">Prevent Default</a>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <aside class="console">
      <h3>Console</h3>
      <div class="log-entries">
        <div v-for="(log, i) in logs" :key="i" class="log-entry">{{ log }}</div>
        <div v-if="logs.length === 0" class="log-empty">
          Click a link to see interceptor logs here
        </div>
      </div>
    </aside>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1a1a2e;
  background: #f8f9fa;
}

.layout {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

header {
  margin-bottom: 2rem;
}

header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: #4361ee;
  text-decoration: none;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
}

nav a:hover {
  border-bottom-color: #4361ee;
}

main {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

main h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

main p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

main a {
  color: #4361ee;
}

main ul {
  margin: 0.5rem 0 1rem 1.5rem;
}

main li {
  margin-bottom: 0.25rem;
}

.console {
  background: #1a1a2e;
  color: #a0f0a0;
  border-radius: 8px;
  padding: 1rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.8rem;
}

.console h3 {
  color: #888;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.log-entries {
  max-height: 200px;
  overflow-y: auto;
}

.log-entry {
  padding: 0.15rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.log-empty {
  color: #555;
  font-style: italic;
}

code {
  background: #f0f0f0;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.demo-section {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px dashed #ddd;
}

.demo-section h3 {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}
</style>
