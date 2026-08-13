const GITHUB_USERNAME = "iceywu";

export interface RepoCard {
  badge?: string;
  description: string | null;
  forks: number;
  id: string;
  isTemplate?: boolean;
  language: string | null;
  name: string;
  owner?: {
    name: string;
    avatarUrl: string;
  };
  stars: number;
  url: string;
}

export interface ProjectSection {
  id: string;
  repos: RepoCard[];
  title: string;
}

interface GHRepo {
  archived: boolean;
  description: string | null;
  fork: boolean;
  forks_count: number;
  full_name: string;
  homepage: string | null;
  html_url: string;
  id: number;
  is_template: boolean;
  language: string | null;
  name: string;
  private: boolean;
  stargazers_count: number;
  topics?: string[];
}

interface ContributedRepo {
  description: string | null;
  fullName: string;
  language: string | null;
  name: string;
  owner: { login: string; avatarUrl: string };
  stars: number;
  url: string;
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
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Fetch own repos first (more reliable, doesn't require search API)
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated`,
      { headers }
    );
    if (reposRes.ok) {
      const allRepos: GHRepo[] = await reposRes.json();
      const publicRepos = allRepos.filter((r) => !(r.private || r.archived));
      const publicNotFork = publicRepos.filter((r) => !r.fork);

      const repoGroups: Record<string, GHRepo[]> = {
        All: publicNotFork,
        Templates: filterRepos(publicNotFork, "template"),
        UnoCSS: filterRepos(publicRepos, "unocss"),
        Utils: filterRepos(publicNotFork, "util"),
        "Vite Ecosystem": filterRepos(publicNotFork, "vite"),
      };

      for (const [title, repos] of Object.entries(repoGroups)) {
        if (repos.length === 0) {
          continue;
        }
        sections.push({
          id: getSectionId(title),
          repos: repos.map((repo) => ({
            badge: `${repo.private ? "Private" : "Public"}${repo.is_template ? " Template" : ""}`,
            description: repo.description,
            forks: repo.forks_count,
            id: String(repo.id),
            isTemplate: repo.is_template,
            language: repo.language,
            name: repo.name,
            stars: repo.stargazers_count,
            url: repo.homepage || repo.html_url,
          })),
          title,
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
                if (!res.ok) {
                  return null;
                }
                return await res.json();
              } catch {
                return null;
              }
            })
          );

          const contributions: ContributedRepo[] = repoDetails
            .filter(Boolean)
            .map((repo: any) => ({
              description: repo.description,
              fullName: repo.full_name,
              language: repo.language,
              name: repo.name,
              owner: {
                avatarUrl: repo.owner.avatar_url,
                login: repo.owner.login,
              },
              stars: repo.stargazers_count,
              url: repo.html_url,
            }))
            .sort((a, b) => b.stars - a.stars);

          if (contributions.length > 0) {
            sections.unshift({
              id: getSectionId("Contributed To"),
              repos: contributions.map((repo) => ({
                description: repo.description,
                forks: 0,
                id: repo.fullName,
                language: repo.language,
                name: repo.name,
                owner: {
                  avatarUrl: repo.owner.avatarUrl,
                  name: repo.owner.login,
                },
                stars: repo.stars,
                url: repo.url,
              })),
              title: "Contributed To",
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
  c: "#555555",
  "c#": "#178600",
  "c++": "#f34b7d",
  css: "#563d7c",
  dart: "#00B4AB",
  go: "#00ADD8",
  html: "#e34c26",
  java: "#b07219",
  javascript: "#f1e05a",
  kotlin: "#F18E33",
  php: "#4F5D95",
  python: "#3572a5",
  ruby: "#701516",
  rust: "#dea584",
  scss: "#c6538c",
  shell: "#89e051",
  swift: "#ffac45",
  typescript: "#3178c6",
  vue: "#41b883",
};

export function getLanguageColor(language: string) {
  return language2Color[language.toLowerCase()] || "#ddd";
}
