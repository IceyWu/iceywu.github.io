import { getRelativeLocaleUrl } from "astro:i18n";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locales";
import { interpolate, ui, type Dict, type HomeNavKey } from "./ui";

export * from "./locales";
export { interpolate, ui, type Dict, type HomeNavKey };

export function toLocale(value: string | undefined): Locale {
  return LOCALES.find((locale) => locale === value) ?? DEFAULT_LOCALE;
}

export function useTranslations(locale: Locale): Dict {
  return ui[locale];
}

export function localeUrl(locale: Locale, path = ""): string {
  return getRelativeLocaleUrl(locale, path);
}

export function localeParam(locale: Locale): string | undefined {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}
