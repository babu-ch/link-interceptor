<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const dynamicHtml = () => `<p>${t("internal.vhtmlContent")}</p>`;
</script>

<template>
  <div>
    <h2>{{ $t("internal.title") }}</h2>
    <p>{{ $t("internal.description", { tag: "<a>" }) }}</p>

    <div class="demo-section">
      <h3>{{ $t("internal.normalLinks") }}</h3>
      <ul>
        <li><a href="/">{{ $t("internal.toHome") }}</a></li>
        <li><a href="/external">{{ $t("internal.toExternal") }}</a></li>
        <li><a href="/prevent">{{ $t("internal.toPrevent") }}</a></li>
      </ul>
    </div>

    <div class="demo-section">
      <h3>{{ $t("internal.vhtml") }}</h3>
      <div v-html="dynamicHtml()"></div>
    </div>

    <div class="demo-section">
      <h3>{{ $t("internal.nested") }}</h3>
      <p>
        <a href="/external"><strong><em>{{ $t("internal.nestedLink") }}</em></strong></a>
        - {{ $t("internal.nestedDesc", { tag: "<a>" }) }}
      </p>
    </div>

    <div class="demo-section">
      <h3>{{ $t("internal.routerLink") }}</h3>
      <p>{{ $t("internal.routerLinkDesc") }}</p>
      <ul>
        <li><router-link to="/">{{ $t("internal.routerLinkToHome") }}</router-link></li>
        <li><a href="/external">{{ $t("internal.plainLinkToExternal") }}</a></li>
      </ul>
      <p><small>{{ $t("internal.routerLinkNote") }}</small></p>
    </div>

    <div class="demo-section">
      <h3>{{ $t("internal.routerLinkGotcha") }}</h3>
      <p>{{ $t("internal.routerLinkGotchaDesc") }}</p>
      <ul>
        <li><router-link to="/" replace data-no-intercept>{{ $t("internal.routerLinkReplace") }}</router-link></li>
      </ul>
      <p><small>{{ $t("internal.routerLinkGotchaNote") }}</small></p>
      <p><small>{{ $t("internal.routerLinkWorkaround") }}</small></p>
    </div>
  </div>
</template>
