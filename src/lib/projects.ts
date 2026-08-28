const GITHUB_USERNAME = "iceywu";

export interface RepoCard {
  description: string | null;
  forks: number | null;
  fullName: string;
  githubUrl: string;
  homepageUrl: string | null;
  isTemplate: boolean;
  key: string;
  language: string | null;
  name: string;
  owner?: {
    name: string;
    avatarUrl: string;
  };
  stars: number | null;
  updatedAt: Date | null;
}

export interface ProjectData {
  contributions: RepoCard[];
  own: RepoCard[];
  source: "github" | "fallback";
}

interface GHRepo {
  archived: boolean;
  description: string | null;
  fork: boolean;
  forks_count: number;
  full_name: string;
  homepage: string | null;
  html_url: string;
  is_template: boolean;
  language: string | null;
  name: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  private: boolean;
  pushed_at: string | null;
  stargazers_count: number;
}

interface GitHubSearchResult {
  items?: { repository_url: string }[];
}

const FALLBACK_PROJECTS = [
  ["eos", "Cross-framework component library built with Web Components 🙌"],
  ["live-photo", "A LivePhoto viewer for web applications 🖼️"],
  ["viewer-pro", "A powerful image/video viewer component"],
  ["quick-memo", "Your efficient and convenient note-taking tool 🎉"],
  ["utils", "Collection of common JavaScript / TypeScript utilities"],
  ["vue-hooks-pure", "Pure Vue 3 composable hooks"],
] as const;

function toDate(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date;
}

function mapRepo(repo: GHRepo, includeOwner = false): RepoCard {
  return {
    description: repo.description,
    forks: repo.forks_count,
    fullName: repo.full_name,
    githubUrl: repo.html_url,
    homepageUrl: repo.homepage?.trim() || null,
    isTemplate: repo.is_template,
    key: repo.full_name.toLowerCase(),
    language: repo.language,
    name: repo.name,
    owner: includeOwner
      ? {
          avatarUrl: repo.owner.avatar_url,
          name: repo.owner.login,
        }
      : undefined,
    stars: repo.stargazers_count,
    updatedAt: toDate(repo.pushed_at),
  };
}

function compareByActivity(a: RepoCard, b: RepoCard): number {
  return (
    (b.updatedAt?.valueOf() ?? 0) - (a.updatedAt?.valueOf() ?? 0) ||
    b.stars! - a.stars! ||
    a.name.localeCompare(b.name)
  );
}

function fallbackData(): ProjectData {
  return {
    contributions: [],
    own: FALLBACK_PROJECTS.map(([name, description]) => ({
      description,
      forks: null,
      fullName: `${GITHUB_USERNAME}/${name}`,
      githubUrl: `https://github.com/${GITHUB_USERNAME}/${name}`,
      homepageUrl: null,
      isTemplate: false,
      key: `${GITHUB_USERNAME}/${name}`.toLowerCase(),
      language: null,
      name,
      stars: null,
      updatedAt: null,
    })),
    source: "fallback",
  };
}

async function loadProjects(): Promise<ProjectData> {
  const token = import.meta.env.MY_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "astro-blog",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let own: RepoCard[] = [];
  let contributions: RepoCard[] = [];

  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated`,
      { headers },
    );

    if (reposResponse.ok) {
      const repos: GHRepo[] = await reposResponse.json();
      own = repos
        .filter((repo) => !(repo.private || repo.archived || repo.fork))
        .map((repo) => mapRepo(repo))
        .sort(compareByActivity);
    } else {
      console.warn(
        `[projects] GitHub repositories request failed: ${reposResponse.status}`,
      );
    }
  } catch (error) {
    console.warn("[projects] GitHub repositories request failed", error);
  }

  if (token) {
    try {
      const searchResponse = await fetch(
        `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged+-user:${GITHUB_USERNAME}&per_page=100`,
        { headers },
      );

      if (searchResponse.ok) {
        const result: GitHubSearchResult = await searchResponse.json();
        const names = [
          ...new Set(
            (result.items ?? []).map((item) =>
              item.repository_url.replace(
                "https://api.github.com/repos/",
                "",
              ),
            ),
          ),
        ].slice(0, 20);

        const details = await Promise.all(
          names.map(async (fullName) => {
            try {
              const response = await fetch(
                `https://api.github.com/repos/${fullName}`,
                { headers },
              );
              return response.ok ? ((await response.json()) as GHRepo) : null;
            } catch {
              return null;
            }
          }),
        );

        contributions = details
          .filter((repo): repo is GHRepo => repo !== null)
          .map((repo) => mapRepo(repo, true))
          .sort(
            (a, b) =>
              (b.stars ?? 0) - (a.stars ?? 0) ||
              a.fullName.localeCompare(b.fullName),
          );
      } else {
        console.warn(
          `[projects] GitHub contributions request failed: ${searchResponse.status}`,
        );
      }
    } catch (error) {
      console.warn("[projects] GitHub contributions request failed", error);
    }
  }

  return own.length || contributions.length
    ? { contributions, own, source: "github" }
    : fallbackData();
}

let projectsPromise: Promise<ProjectData> | undefined;

export function getProjects(): Promise<ProjectData> {
  projectsPromise ??= loadProjects();
  return projectsPromise;
}

export function formatProjectDate(date: Date, locale: "zh-CN" | "en"): string {
  return new Intl.DateTimeFormat(locale, {
    month: locale === "zh-CN" ? "long" : "short",
    year: "numeric",
    timeZone: "Asia/Shanghai",
  }).format(date);
}
