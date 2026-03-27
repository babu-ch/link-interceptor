<template>
  <div>
    <h2>{{ $t("external.title") }}</h2>
    <p>{{ $t("external.description") }}</p>

    <div class="demo-section">
      <h3>{{ $t("external.externalLinks") }}</h3>
      <ul>
        <li><a href="https://example.com">example.com</a></li>
        <li><a href="https://vuejs.org">vuejs.org</a></li>
        <li><a href="https://github.com" target="_blank">github.com (target="_blank")</a></li>
      </ul>
      <p>
        <small>{{ $t("external.note") }}</small>
      </p>
    </div>

    <div class="demo-section">
      <h3>{{ $t("external.modifierTest") }}</h3>
      <p>
        <a href="https://example.com">{{ $t("external.thisLink") }}</a>
        {{ $t("external.modifierDesc") }}
      </p>
    </div>
  </div>
</template>
