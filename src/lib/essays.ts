import { type CollectionEntry, getCollection } from "astro:content";
import { type Locale, localeUrl } from "../i18n";
import {
  compareContent,
  formatContentDate,
  getAdjacentContent,
  getContentAlternates,
  getContentReadingTime,
  getContentTranslation,
  groupContentByYear,
  validateContent,
} from "./content-utils";

export type EssayEntry = CollectionEntry<"essays">;

export async function getEssays(locale?: Locale): Promise<EssayEntry[]> {
  const essays = (await getCollection("essays"))
    .filter((essay) => import.meta.env.DEV || !essay.data.draft)
    .sort(compareContent);

  validateContent(essays, {
    duplicateRoute: (key) => `Duplicate essay route: ${key}`,
    duplicateTranslation: (key) => `Duplicate essay translation: ${key}`,
  });
  return locale ? essays.filter((essay) => essay.data.lang === locale) : essays;
}

export function getEssayUrl(essay: EssayEntry): string {
  return localeUrl(essay.data.lang, `essays/${essay.data.route}`);
}

export function getEssaysUrl(locale: Locale): string {
  return localeUrl(locale, "essays");
}

export function groupEssaysByYear(
  essays: EssayEntry[]
): { year: number; essays: EssayEntry[] }[] {
  return groupContentByYear(essays).map(({ year, entries }) => ({
    essays: entries,
    year,
  }));
}

export function formatEssayDate(
  date: Date,
  locale: Locale,
  includeYear = false
): string {
  return formatContentDate(date, locale, includeYear);
}

export function getEssayReadingTime(body: string): number {
  return getContentReadingTime(body);
}

export function getEssayAlternates(
  essay: EssayEntry,
  essays: EssayEntry[]
): Partial<Record<Locale, string>> {
  return getContentAlternates(essay, essays, getEssayUrl);
}

export function getEssayTranslation(
  essay: EssayEntry,
  essays: EssayEntry[],
  locale: Locale
): EssayEntry | undefined {
  return getContentTranslation(essay, essays, locale);
}

export function getAdjacentEssays(
  essay: EssayEntry,
  essays: EssayEntry[]
): { newer?: EssayEntry; older?: EssayEntry } {
  return getAdjacentContent(essay, essays);
}
