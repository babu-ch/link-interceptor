<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import CodeBlock from "../components/CodeBlock.vue";

const tabs = ["core", "vue", "react", "svelte"] as const;
type Tab = (typeof tabs)[number];

const route = useRoute();
const fwParam = route.query.fw as string | undefined;
const initialTab: Tab = tabs.includes(fwParam as Tab) ? (fwParam as Tab) : "core";
const activeTab = ref<Tab>(initialTab);

const codeExamples = {
  core: `import { interceptLinks } from 'link-interceptor'

const cleanup = interceptLinks({
  onInternalLink(ctx) {
    ctx.preventDefault()
    // your router logic
    history.pushState(null, '', ctx.path)
  },
  onExternalLink(ctx) {
    ctx.url.searchParams.set('utm_source', 'myapp')
  },
})

// later: cleanup()`,

  vue: `import { linkInterceptorPlugin } from 'vue-link-interceptor'

app.use(linkInterceptorPlugin, {
  onInternalLink(ctx) {
    ctx.preventDefault()
    router.push(ctx.path)
  },
  onExternalLink(ctx) {
    ctx.url.searchParams.set('utm_source', 'myapp')
  },
})`,

  react: `import { useLinkInterceptor } from 'react-link-interceptor'

function App() {
  useLinkInterceptor({
    onInternalLink(ctx) {
      ctx.preventDefault()
      navigate(ctx.path)  // react-router
    },
    onExternalLink(ctx) {
      ctx.url.searchParams.set('utm_source', 'myapp')
    },
  })
  return <div>...</div>
}`,

  svelte: ["<scr", "ipt>", `
  import { linkInterceptor } from 'svelte-link-interceptor'

  const options = {
    onInternalLink(ctx) {
      ctx.preventDefault()
      goto(ctx.path)  // SvelteKit
    },
    onExternalLink(ctx) {
      ctx.url.searchParams.set('utm_source', 'myapp')
    },
  }
`, "</scr", "ipt>", `

<div use:linkInterceptor={options}>
  ...
</div>`].join(""),
};

const installCommands: Record<string, string> = {
  core: "npm install link-interceptor",
  vue: "npm install vue-link-interceptor",
  react: "npm install react-link-interceptor",
  svelte: "npm install svelte-link-interceptor",
};
</script>

<template>
  <div>
    <h2>link-interceptor</h2>
    <p>{{ $t("home.description", { tag: "<a>" }) }}</p>

    <div class="demo-section">
      <h3>{{ $t("home.install") }}</h3>
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['tab', { active: activeTab === tab }]"
          @click="activeTab = tab"
        >
          {{ tab === 'core' ? 'Core' : tab === 'vue' ? 'Vue' : tab === 'react' ? 'React' : 'Svelte' }}
        </button>
      </div>
      <CodeBlock :code="installCommands[activeTab]" lang="bash" />
      <CodeBlock
        :code="codeExamples[activeTab as keyof typeof codeExamples]"
        :lang="activeTab === 'svelte' ? 'xml' : 'typescript'"
        style="margin-top: 0.5rem"
      />
    </div>

    <div class="demo-section">
      <h3>{{ $t("home.basic") }}</h3>
      <ul>
        <li><a href="/internal">Internal Links</a> - {{ $t("home.internalDesc") }}</li>
        <li><a href="/external">External Links</a> - {{ $t("home.externalDesc") }}</li>
        <li><a href="/prevent">Prevent Default</a> - {{ $t("home.preventDesc") }}</li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("home.useCases") }}</h3>
      <ul>
        <li><a href="/analytics">Analytics</a> - {{ $t("home.analyticsDesc") }}</li>
        <li><a href="/confirm">Confirm Dialog</a> - {{ $t("home.confirmDesc") }}</li>
        <li><a href="/form-guard">Form Guard</a> - {{ $t("home.formGuardDesc") }}</li>
        <li><a href="/security">Security</a> - {{ $t("home.securityDesc") }}</li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("home.console") }}</h3>
      <p>{{ $t("home.consoleDescription") }}</p>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 0;
}

.tab {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-bottom: none;
  background: #f8f9fa;
  color: #666;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
}

.tab.active {
  background: #1a1a2e;
  color: #a0f0a0;
  border-color: #1a1a2e;
}
</style>
