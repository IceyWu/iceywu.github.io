import type { Locale } from "../i18n";

const TIME_ZONE = "Asia/Shanghai";

interface ContentData {
  date: Date;
  lang: Locale;
  route: string;
  translationKey: string;
}

interface ContentEntry {
  data: ContentData;
}

interface ValidationMessages {
  duplicateRoute: (key: string) => string;
  duplicateTranslation: (key: string) => string;
}

export function compareContent<T extends ContentEntry>(a: T, b: T): number {
  return (
    b.data.date.valueOf() - a.data.date.valueOf() ||
    a.data.route.localeCompare(b.data.route)
  );
}

export function validateContent<T extends ContentEntry>(
  entries: T[],
  messages: ValidationMessages
): void {
  const routes = new Set<string>();
  const translations = new Set<string>();

  for (const entry of entries) {
    const routeKey = `${entry.data.lang}:${entry.data.route}`;
    const translationKey = `${entry.data.translationKey}:${entry.data.lang}`;

    if (routes.has(routeKey)) {
      throw new Error(messages.duplicateRoute(routeKey));
    }
    if (translations.has(translationKey)) {
      throw new Error(messages.duplicateTranslation(translationKey));
    }

    routes.add(routeKey);
    translations.add(translationKey);
  }
}

export function groupContentByYear<T extends ContentEntry>(
  entries: T[]
): { year: number; entries: T[] }[] {
  const groups = new Map<number, T[]>();

  for (const entry of entries) {
    const year = Number(
      new Intl.DateTimeFormat("en", {
        timeZone: TIME_ZONE,
        year: "numeric",
      }).format(entry.data.date)
    );
    const group = groups.get(year) ?? [];
    group.push(entry);
    groups.set(year, group);
  }

  return [...groups].map(([year, groupedEntries]) => ({
    entries: groupedEntries,
    year,
  }));
}

export function formatContentDate(
  date: Date,
  locale: Locale,
  includeYear = false
): string {
  return new Intl.DateTimeFormat(locale, {
    ...(includeYear ? { year: "numeric" as const } : {}),
    day: "numeric",
    month: locale === "zh-CN" ? "long" : "short",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function getContentReadingTime(body: string): number {
  const cjk = (body.match(/\p{Script=Han}/gu) ?? []).length;
  const words = body
    .replace(/\p{Script=Han}/gu, " ")
    .split(/\s+/u)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(cjk / 500 + words / 225));
}

export function getContentAlternates<T extends ContentEntry>(
  entry: T,
  entries: T[],
  getUrl: (candidate: T) => string
): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    entries
      .filter(
        (candidate) =>
          candidate.data.translationKey === entry.data.translationKey
      )
      .map((candidate) => [candidate.data.lang, getUrl(candidate)])
  );
}

export function getContentTranslation<T extends ContentEntry>(
  entry: T,
  entries: T[],
  locale: Locale
): T | undefined {
  return entries.find(
    (candidate) =>
      candidate.data.translationKey === entry.data.translationKey &&
      candidate.data.lang === locale
  );
}

export function getAdjacentContent<T extends ContentEntry>(
  entry: T,
  entries: T[]
): { newer?: T; older?: T } {
  const localized = entries.filter(
    (candidate) => candidate.data.lang === entry.data.lang
  );
  const index = localized.findIndex(
    (candidate) => candidate.data.route === entry.data.route
  );

  if (index < 0) {
    return {};
  }

  return {
    newer: index > 0 ? localized[index - 1] : undefined,
    older: index < localized.length - 1 ? localized[index + 1] : undefined,
  };
}
