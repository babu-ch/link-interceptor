<script setup lang="ts">
import { computed } from "vue";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("bash", bash);

const props = withDefaults(
  defineProps<{ code: string; lang?: string }>(),
  { lang: "typescript" },
);

const highlighted = computed(() => {
  return hljs.highlight(props.code.trim(), { language: props.lang }).value;
});
</script>

<template>
  <pre class="code-block"><code v-html="highlighted"></code></pre>
</template>

<style>
.code-block {
  background: #1a1a2e;
  padding: 1rem;
  border-radius: 0 6px 6px 6px;
  font-size: 0.8rem;
  overflow-x: auto;
  line-height: 1.5;
  margin-top: 0;
}

.code-block code {
  background: none;
  padding: 0;
  font-size: inherit;
}

/* highlight.js theme (GitHub Dark inspired) */
.hljs { color: #c9d1d9; }
.hljs-keyword { color: #ff7b72; }
.hljs-string { color: #a5d6ff; }
.hljs-title { color: #d2a8ff; }
.hljs-title.function_ { color: #d2a8ff; }
.hljs-params { color: #c9d1d9; }
.hljs-comment { color: #8b949e; }
.hljs-number { color: #79c0ff; }
.hljs-literal { color: #79c0ff; }
.hljs-built_in { color: #ffa657; }
.hljs-property { color: #79c0ff; }
.hljs-attr { color: #79c0ff; }
.hljs-tag { color: #7ee787; }
.hljs-name { color: #7ee787; }
.hljs-variable { color: #ffa657; }
.hljs-type { color: #ffa657; }
</style>
