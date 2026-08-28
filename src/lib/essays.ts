import { getCollection, type CollectionEntry } from "astro:content";
import { localeUrl, type Locale } from "../i18n";

export type EssayEntry = CollectionEntry<"essays">;

const TIME_ZONE = "Asia/Shanghai";

function compareEssays(a: EssayEntry, b: EssayEntry): number {
  return (
    b.data.date.valueOf() - a.data.date.valueOf() ||
    a.data.route.localeCompare(b.data.route)
  );
}

function validateEssays(essays: EssayEntry[]): void {
  const routes = new Set<string>();
  const translations = new Set<string>();

  for (const essay of essays) {
    const routeKey = `${essay.data.lang}:${essay.data.route}`;
    const translationKey = `${essay.data.translationKey}:${essay.data.lang}`;

    if (routes.has(routeKey)) {
      throw new Error(`Duplicate essay route: ${routeKey}`);
    }
    if (translations.has(translationKey)) {
      throw new Error(`Duplicate essay translation: ${translationKey}`);
    }

    routes.add(routeKey);
    translations.add(translationKey);
  }
}

export async function getEssays(locale?: Locale): Promise<EssayEntry[]> {
  const essays = (await getCollection("essays"))
    .filter((essay) => import.meta.env.DEV || !essay.data.draft)
    .sort(compareEssays);

  validateEssays(essays);
  return locale
    ? essays.filter((essay) => essay.data.lang === locale)
    : essays;
}

export function getEssayUrl(essay: EssayEntry): string {
  return localeUrl(essay.data.lang, `essays/${essay.data.route}`);
}

export function getEssaysUrl(locale: Locale): string {
  return localeUrl(locale, "essays");
}

export function groupEssaysByYear(
  essays: EssayEntry[],
): { year: number; essays: EssayEntry[] }[] {
  const groups = new Map<number, EssayEntry[]>();

  for (const essay of essays) {
    const year = Number(
      new Intl.DateTimeFormat("en", {
        timeZone: TIME_ZONE,
        year: "numeric",
      }).format(essay.data.date),
    );
    const group = groups.get(year) ?? [];
    group.push(essay);
    groups.set(year, group);
  }

  return [...groups].map(([year, entries]) => ({ year, essays: entries }));
}

export function formatEssayDate(
  date: Date,
  locale: Locale,
  includeYear = false,
): string {
  return new Intl.DateTimeFormat(locale, {
    ...(includeYear ? { year: "numeric" as const } : {}),
    month: locale === "zh-CN" ? "long" : "short",
    day: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function getEssayReadingTime(body: string): number {
  const cjk = (body.match(/\p{Script=Han}/gu) ?? []).length;
  const words = body
    .replace(/\p{Script=Han}/gu, " ")
    .split(/\s+/u)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(cjk / 500 + words / 225));
}

export function getEssayAlternates(
  essay: EssayEntry,
  essays: EssayEntry[],
): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    essays
      .filter(
        (candidate) =>
          candidate.data.translationKey === essay.data.translationKey,
      )
      .map((candidate) => [candidate.data.lang, getEssayUrl(candidate)]),
  );
}

export function getEssayTranslation(
  essay: EssayEntry,
  essays: EssayEntry[],
  locale: Locale,
): EssayEntry | undefined {
  return essays.find(
    (candidate) =>
      candidate.data.translationKey === essay.data.translationKey &&
      candidate.data.lang === locale,
  );
}

export function getAdjacentEssays(
  essay: EssayEntry,
  essays: EssayEntry[],
): { newer?: EssayEntry; older?: EssayEntry } {
  const localized = essays.filter(
    (candidate) => candidate.data.lang === essay.data.lang,
  );
  const index = localized.findIndex(
    (candidate) => candidate.data.route === essay.data.route,
  );

  if (index < 0) return {};

  return {
    newer: index > 0 ? localized[index - 1] : undefined,
    older: index < localized.length - 1 ? localized[index + 1] : undefined,
  };
}
