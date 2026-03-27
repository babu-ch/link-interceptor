<template>
  <div>
    <h2>{{ $t("home.title") }}</h2>
    <p>{{ $t("home.description", { tag: "<a>" }) }}</p>

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
