import { getCollection, type CollectionEntry } from "astro:content";
import { localeUrl, type Locale } from "../i18n";

export type PostEntry = CollectionEntry<"posts">;

const TIME_ZONE = "Asia/Shanghai";

function comparePosts(a: PostEntry, b: PostEntry): number {
  return (
    b.data.date.valueOf() - a.data.date.valueOf() ||
    a.data.route.localeCompare(b.data.route)
  );
}

function validatePosts(posts: PostEntry[]): void {
  const routes = new Set<string>();
  const translations = new Set<string>();

  for (const post of posts) {
    const routeKey = `${post.data.lang}:${post.data.route}`;
    const translationKey = `${post.data.translationKey}:${post.data.lang}`;

    if (routes.has(routeKey)) {
      throw new Error(`Duplicate post route: ${routeKey}`);
    }
    if (translations.has(translationKey)) {
      throw new Error(`Duplicate post translation: ${translationKey}`);
    }

    routes.add(routeKey);
    translations.add(translationKey);
  }
}

export async function getPosts(locale?: Locale): Promise<PostEntry[]> {
  const posts = (await getCollection("posts"))
    .filter((post) => import.meta.env.DEV || !post.data.draft)
    .sort(comparePosts);

  validatePosts(posts);
  return locale ? posts.filter((post) => post.data.lang === locale) : posts;
}

export function getPostUrl(post: PostEntry): string {
  return localeUrl(post.data.lang, `posts/${post.data.route}`);
}

export function getPostsUrl(locale: Locale): string {
  return localeUrl(locale, "posts");
}

export function groupPostsByYear(
  posts: PostEntry[],
): { year: number; posts: PostEntry[] }[] {
  const groups = new Map<number, PostEntry[]>();

  for (const post of posts) {
    const year = Number(
      new Intl.DateTimeFormat("en", {
        timeZone: TIME_ZONE,
        year: "numeric",
      }).format(post.data.date),
    );
    const group = groups.get(year) ?? [];
    group.push(post);
    groups.set(year, group);
  }

  return [...groups].map(([year, entries]) => ({ year, posts: entries }));
}

export function formatPostDate(
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

export function getReadingTime(body: string): number {
  const cjk = (body.match(/\p{Script=Han}/gu) ?? []).length;
  const words = body
    .replace(/\p{Script=Han}/gu, " ")
    .split(/\s+/u)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(cjk / 500 + words / 225));
}

export function getPostAlternates(
  post: PostEntry,
  posts: PostEntry[],
): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    posts
      .filter((candidate) => candidate.data.translationKey === post.data.translationKey)
      .map((candidate) => [candidate.data.lang, getPostUrl(candidate)]),
  );
}

export function getPostTranslation(
  post: PostEntry,
  posts: PostEntry[],
  locale: Locale,
): PostEntry | undefined {
  return posts.find(
    (candidate) =>
      candidate.data.translationKey === post.data.translationKey &&
      candidate.data.lang === locale,
  );
}

export function getAdjacentPosts(
  post: PostEntry,
  posts: PostEntry[],
): { newer?: PostEntry; older?: PostEntry } {
  const localized = posts.filter((candidate) => candidate.data.lang === post.data.lang);
  const index = localized.findIndex(
    (candidate) => candidate.data.route === post.data.route,
  );

  if (index < 0) return {};

  return {
    newer: index > 0 ? localized[index - 1] : undefined,
    older: index < localized.length - 1 ? localized[index + 1] : undefined,
  };
}
