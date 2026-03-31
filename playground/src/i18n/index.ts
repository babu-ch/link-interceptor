import { createI18n } from "vue-i18n";
import en from "./en";
import ja from "./ja";
import zh from "./zh";
import ko from "./ko";
import es from "./es";
import fr from "./fr";
import de from "./de";
import pt from "./pt";

export const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
};

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, ja, zh, ko, es, fr, de, pt },
});
