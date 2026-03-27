<script setup lang="ts">
import { ref } from "vue";

const events = ref<{ time: string; type: string; url: string }[]>([]);

window.__analyticsEvents = events;
</script>

<template>
  <div>
    <h2>{{ $t("analytics.title") }}</h2>
    <p>{{ $t("analytics.description") }}</p>

    <div class="demo-section">
      <h3>{{ $t("analytics.tryClick") }}</h3>
      <ul>
        <li><a href="/internal">{{ $t("analytics.internalLink") }}</a></li>
        <li><a href="https://vuejs.org">vuejs.org</a></li>
        <li><a href="https://github.com">github.com</a></li>
        <li><a href="/external">{{ $t("analytics.anotherDemo") }}</a></li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("analytics.collectedEvents") }}</h3>
      <table v-if="events.length > 0" class="event-table">
        <thead>
          <tr>
            <th>{{ $t("analytics.time") }}</th>
            <th>{{ $t("analytics.type") }}</th>
            <th>{{ $t("analytics.url") }}</th>
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
      <p v-else class="empty-state">{{ $t("analytics.noEvents") }}</p>
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
