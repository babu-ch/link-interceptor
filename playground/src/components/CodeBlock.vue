<script setup lang="ts">
import { computed } from "vue";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/github-dark.min.css";

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
  <pre class="code-block hljs"><code v-html="highlighted"></code></pre>
</template>

<style scoped>
.code-block {
  border-radius: 0 6px 6px 6px;
  font-size: 0.8rem;
  overflow-x: auto;
  line-height: 1.5;
  margin-top: 0;
  padding: 1rem;
}

.code-block :deep(code) {
  background: none !important;
  padding: 0 !important;
  font-size: inherit;
  color: inherit;
}
</style>
