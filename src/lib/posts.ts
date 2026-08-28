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

export type PostEntry = CollectionEntry<"posts">;

export async function getPosts(locale?: Locale): Promise<PostEntry[]> {
  const posts = (await getCollection("posts"))
    .filter((post) => import.meta.env.DEV || !post.data.draft)
    .sort(compareContent);

  validateContent(posts, {
    duplicateRoute: (key) => `Duplicate post route: ${key}`,
    duplicateTranslation: (key) => `Duplicate post translation: ${key}`,
  });
  return locale ? posts.filter((post) => post.data.lang === locale) : posts;
}

export function getPostUrl(post: PostEntry): string {
  return localeUrl(post.data.lang, `posts/${post.data.route}`);
}

export function getPostsUrl(locale: Locale): string {
  return localeUrl(locale, "posts");
}

export function groupPostsByYear(
  posts: PostEntry[]
): { year: number; posts: PostEntry[] }[] {
  return groupContentByYear(posts).map(({ year, entries }) => ({
    posts: entries,
    year,
  }));
}

export function formatPostDate(
  date: Date,
  locale: Locale,
  includeYear = false
): string {
  return formatContentDate(date, locale, includeYear);
}

export function getReadingTime(body: string): number {
  return getContentReadingTime(body);
}

export function getPostAlternates(
  post: PostEntry,
  posts: PostEntry[]
): Partial<Record<Locale, string>> {
  return getContentAlternates(post, posts, getPostUrl);
}

export function getPostTranslation(
  post: PostEntry,
  posts: PostEntry[],
  locale: Locale
): PostEntry | undefined {
  return getContentTranslation(post, posts, locale);
}

export function getAdjacentPosts(
  post: PostEntry,
  posts: PostEntry[]
): { newer?: PostEntry; older?: PostEntry } {
  return getAdjacentContent(post, posts);
}
