<script setup lang="ts">
import { ref } from "vue";

const blocked = ref(false);
const blockedUrl = ref("");

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
    <h2>{{ $t("prevent.title") }}</h2>
    <p>{{ $t("prevent.description") }}</p>

    <div class="demo-section">
      <h3>{{ $t("prevent.normalLink") }}</h3>
      <p><a href="/">{{ $t("prevent.toHome") }}</a></p>
    </div>

    <div class="demo-section">
      <h3>{{ $t("prevent.blockedLinks") }}</h3>
      <p>{{ $t("prevent.blockedDesc") }}</p>
      <p>
        <a href="https://blocked.example.com" data-block>
          {{ $t("prevent.blockedLink") }}
        </a>
      </p>

      <div v-if="blocked" class="blocked-toast">
        {{ $t("prevent.blockedToast", { url: blockedUrl }) }}
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
