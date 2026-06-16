const GITHUB_USERNAME = "iceywu";

export interface RepoCard {
  id: string;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  badge?: string;
  isTemplate?: boolean;
  owner?: {
    name: string;
    avatarUrl: string;
  };
}

export interface ProjectSection {
  title: string;
  id: string;
  repos: RepoCard[];
}

interface GHRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
  archived: boolean;
  fork: boolean;
  is_template: boolean;
  topics?: string[];
}

interface ContributedRepo {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  owner: { login: string; avatarUrl: string };
}

function getSectionId(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function filterRepos(repos: GHRepo[], key: string) {
  return repos
    .filter((repo) => repo.topics?.includes(key))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export async function getProjectSections(): Promise<ProjectSection[]> {
  const sections: ProjectSection[] = [];

  try {
    const token = import.meta.env.MY_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "astro-blog",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    // Fetch own repos first (more reliable, doesn't require search API)
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated`,
      { headers }
    );
    if (reposRes.ok) {
      const allRepos: GHRepo[] = await reposRes.json();
      const publicRepos = allRepos.filter((r) => !r.private && !r.archived);
      const publicNotFork = publicRepos.filter((r) => !r.fork);

      const repoGroups: Record<string, GHRepo[]> = {
        Templates: filterRepos(publicNotFork, "template"),
        "Vite Ecosystem": filterRepos(publicNotFork, "vite"),
        Utils: filterRepos(publicNotFork, "util"),
        UnoCSS: filterRepos(publicRepos, "unocss"),
        All: publicNotFork,
      };

      for (const [title, repos] of Object.entries(repoGroups)) {
        if (repos.length === 0) continue;
        sections.push({
          title,
          id: getSectionId(title),
          repos: repos.map((repo) => ({
            id: String(repo.id),
            name: repo.name,
            description: repo.description,
            url: repo.homepage || repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            badge: `${repo.private ? "Private" : "Public"}${repo.is_template ? " Template" : ""}`,
            isTemplate: repo.is_template,
          })),
        });
      }
    }

    // Fetch contributions (merged PRs to other repos) - requires token
    if (token) {
      try {
        const prRes = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged+-user:${GITHUB_USERNAME}&per_page=100`,
          { headers }
        );
        if (prRes.ok) {
          const prData = await prRes.json();
          const repoNames = [
            ...new Set(
              (prData.items || []).map((i: any) =>
                i.repository_url.replace("https://api.github.com/repos/", "")
              )
            ),
          ] as string[];

          const repoDetails = await Promise.all(
            repoNames.slice(0, 20).map(async (fullName) => {
              try {
                const res = await fetch(
                  `https://api.github.com/repos/${fullName}`,
                  { headers }
                );
                if (!res.ok) return null;
                return await res.json();
              } catch {
                return null;
              }
            })
          );

          const contributions: ContributedRepo[] = repoDetails
            .filter(Boolean)
            .map((repo: any) => ({
              name: repo.name,
              fullName: repo.full_name,
              description: repo.description,
              url: repo.html_url,
              stars: repo.stargazers_count,
              language: repo.language,
              owner: { login: repo.owner.login, avatarUrl: repo.owner.avatar_url },
            }))
            .sort((a, b) => b.stars - a.stars);

          if (contributions.length > 0) {
            sections.unshift({
              title: "Contributed To",
              id: getSectionId("Contributed To"),
              repos: contributions.map((repo) => ({
                id: repo.fullName,
                name: repo.name,
                description: repo.description,
                url: repo.url,
                language: repo.language,
                stars: repo.stars,
                forks: 0,
                owner: { name: repo.owner.login, avatarUrl: repo.owner.avatarUrl },
              })),
            });
          }
        }
      } catch {
        // Contributions fetch is optional
      }
    }
  } catch {
    // API errors are non-fatal
  }

  return sections;
}

const language2Color: Record<string, string> = {
  vue: "#41b883",
  typescript: "#3178c6",
  javascript: "#f1e05a",
  html: "#e34c26",
  css: "#563d7c",
  scss: "#c6538c",
  python: "#3572a5",
  shell: "#89e051",
  "c++": "#f34b7d",
  c: "#555555",
  "c#": "#178600",
  java: "#b07219",
  php: "#4F5D95",
  ruby: "#701516",
  go: "#00ADD8",
  rust: "#dea584",
  dart: "#00B4AB",
  swift: "#ffac45",
  kotlin: "#F18E33",
};

export function getLanguageColor(language: string) {
  return language2Color[language.toLowerCase()] || "#ddd";
}
