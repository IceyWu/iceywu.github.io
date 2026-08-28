import { getRelativeLocaleUrl } from "astro:i18n";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./locales";
import { type Dict, ui } from "./ui";

// biome-ignore lint/performance/noBarrelFile: This module is the intentional public i18n facade.
export * from "./locales";
export { type Dict, type HomeNavKey, interpolate, ui } from "./ui";

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

export interface LocalePageProps {
  locale: Locale;
}

export function getLocaleStaticPaths() {
  return LOCALES.map((locale) => ({
    params: { locale: localeParam(locale) },
    props: { locale } satisfies LocalePageProps,
  }));
}

export function getLocaleAlternates(path = ""): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, localeUrl(locale, path)])
  ) as Record<Locale, string>;
}

export function getLocalePageContext(props: LocalePageProps, path = "") {
  const { locale } = props;

  return {
    alternates: getLocaleAlternates(path),
    locale,
    t: useTranslations(locale),
  };
}
