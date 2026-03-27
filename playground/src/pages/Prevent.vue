<script setup lang="ts">
import { ref } from "vue";

const blocked = ref(false);
const blockedUrl = ref("");

// グローバルのonExternalLinkで処理されるが、
// ここではページ固有のUI表示のためにイベントを監視
const onClickCapture = (e: Event) => {
  const target = e.target as HTMLElement;
  const anchor = target.closest("a");
  if (anchor?.dataset.block) {
    blocked.value = true;
    blockedUrl.value = anchor.href;
    setTimeout(() => {
      blocked.value = false;
    }, 2000);
  }
};
</script>

<template>
  <div @click.capture="onClickCapture">
    <h2>Prevent Default</h2>
    <p>
      コールバック内で <code>ctx.preventDefault()</code> を呼ぶことで、
      リンクの遷移をキャンセルできます。
    </p>

    <div class="demo-section">
      <h3>通常の内部リンク（遷移する）</h3>
      <p><a href="/">Home に遷移</a></p>
    </div>

    <div class="demo-section">
      <h3>ブロック対象のリンク（遷移しない）</h3>
      <p>
        以下のリンクは <code>data-block</code> 属性が付いており、
        main.ts側で遷移をブロックする想定のデモです。
      </p>
      <p>
        <a href="https://blocked.example.com" data-block>
          blocked.example.com（クリックしても遷移しない）
        </a>
      </p>

      <div v-if="blocked" class="blocked-toast">
        {{ blockedUrl }} への遷移をブロックしました
      </div>
    </div>
  </div>
</template>

<style scoped>
.blocked-toast {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 4px;
  font-size: 0.85rem;
}
</style>
