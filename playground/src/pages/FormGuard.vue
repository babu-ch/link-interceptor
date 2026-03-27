<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");

const isDirty = () => name.value !== "" || email.value !== "";

window.__formIsDirty = isDirty;
</script>

<template>
  <div>
    <h2>{{ $t("formGuard.title") }}</h2>
    <p>{{ $t("formGuard.description") }}</p>

    <div class="demo-section">
      <h3>{{ $t("formGuard.formSection") }}</h3>
      <div class="form-group">
        <label>{{ $t("formGuard.name") }}</label>
        <input v-model="name" type="text" :placeholder="$t('formGuard.namePlaceholder')" />
      </div>
      <div class="form-group">
        <label>{{ $t("formGuard.email") }}</label>
        <input v-model="email" type="email" :placeholder="$t('formGuard.emailPlaceholder')" />
      </div>
      <div class="dirty-indicator" :class="{ active: isDirty() }">
        {{ isDirty() ? $t("formGuard.dirty") : $t("formGuard.clean") }}
      </div>
    </div>

    <div class="demo-section">
      <h3>{{ $t("formGuard.navLinks") }}</h3>
      <p>{{ $t("formGuard.navDesc") }}</p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/internal">Internal Links</a></li>
        <li><a href="/analytics">Analytics</a></li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("formGuard.implementation") }}</h3>
      <pre class="code-block">onInternalLink(ctx) {
  if (window.__formIsDirty?.()) {
    ctx.preventDefault()
    if (confirm('{{ $t("formGuard.confirmLeave") }}')) {
      router.push(ctx.path)
    }
    return
  }
  router.push(ctx.path)
}</pre>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 0.75rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.25rem;
}

.form-group input {
  width: 100%;
  max-width: 300px;
  padding: 0.4rem 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-group input:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.15);
}

.dirty-indicator {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.5rem;
}

.dirty-indicator.active {
  color: #d97706;
  font-weight: 600;
}

.code-block {
  background: #1a1a2e;
  color: #a0f0a0;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  overflow-x: auto;
  line-height: 1.5;
}
</style>
