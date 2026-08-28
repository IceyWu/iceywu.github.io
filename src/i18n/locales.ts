export const LOCALES = ["zh-CN", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh-CN";

export const OG_LOCALE: Record<Locale, string> = {
  "zh-CN": "zh_CN",
  en: "en_US",
};

export const HREFLANG: Record<Locale, string> = {
  "zh-CN": "zh-Hans",
  en: "en",
};
