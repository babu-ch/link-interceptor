<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");

const isDirty = () => name.value !== "" || email.value !== "";

// グローバルに dirty チェック関数を公開（main.ts から参照）
window.__formIsDirty = isDirty;
</script>

<template>
  <div>
    <h2>Form Guard</h2>
    <p>
      フォーム編集中にリンクをクリックすると「変更が失われます」と警告する例。<br />
      未保存の入力がある場合のみ確認ダイアログが表示されます。
    </p>

    <div class="demo-section">
      <h3>フォーム（何か入力してからリンクをクリック）</h3>
      <div class="form-group">
        <label>名前</label>
        <input v-model="name" type="text" placeholder="山田太郎" />
      </div>
      <div class="form-group">
        <label>メール</label>
        <input v-model="email" type="email" placeholder="taro@example.com" />
      </div>
      <div class="dirty-indicator" :class="{ active: isDirty() }">
        {{ isDirty() ? "未保存の変更があります" : "変更なし" }}
      </div>
    </div>

    <div class="demo-section">
      <h3>ナビゲーションリンク</h3>
      <p>フォームに入力がある状態でクリックすると確認ダイアログが出ます。</p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/internal">Internal Links</a></li>
        <li><a href="/analytics">Analytics</a></li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>実装イメージ</h3>
      <pre class="code-block">onInternalLink(ctx) {
  if (window.__formIsDirty?.()) {
    ctx.preventDefault()
    if (confirm('変更が失われます。移動しますか？')) {
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
