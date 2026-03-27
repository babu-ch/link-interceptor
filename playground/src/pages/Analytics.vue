<script setup lang="ts">
import { ref } from "vue";

const events = ref<{ time: string; type: string; url: string }[]>([]);

// window にイベント収集用の配列を公開（main.ts から push される）
window.__analyticsEvents = events;
</script>

<template>
  <div>
    <h2>Analytics / Tracking</h2>
    <p>
      リンククリック時にアナリティクスイベントを発火する例。<br />
      GA4 や Mixpanel への送信をイメージしています。
    </p>

    <div class="demo-section">
      <h3>リンクをクリックしてみてください</h3>
      <ul>
        <li><a href="/internal">内部リンク（ページ遷移）</a></li>
        <li><a href="https://vuejs.org">vuejs.org（外部）</a></li>
        <li><a href="https://github.com">github.com（外部）</a></li>
        <li>
          <a href="/external">別のデモページへ</a>
        </li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>収集されたイベント</h3>
      <table v-if="events.length > 0" class="event-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ev, i) in events" :key="i">
            <td>{{ ev.time }}</td>
            <td>
              <span :class="['badge', ev.type === 'internal' ? 'badge-internal' : 'badge-external']">
                {{ ev.type }}
              </span>
            </td>
            <td class="url-cell">{{ ev.url }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty-state">まだイベントがありません</p>
    </div>
  </div>
</template>

<style scoped>
.event-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.event-table th,
.event-table td {
  padding: 0.4rem 0.6rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.event-table th {
  color: #666;
  font-weight: 600;
}

.url-cell {
  word-break: break-all;
  font-family: monospace;
  font-size: 0.8rem;
}

.badge {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-internal {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-external {
  background: #fef3c7;
  color: #92400e;
}

.empty-state {
  color: #999;
  font-style: italic;
}
</style>
