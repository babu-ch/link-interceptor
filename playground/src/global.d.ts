import type { Ref } from "vue";

declare global {
  interface Window {
    __analyticsEvents?: Ref<{ time: string; type: string; url: string }[]>;
    __formIsDirty?: () => boolean;
  }
}
