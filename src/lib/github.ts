export interface GithubStats {
  avatar: string;
  createdAt: string;
  languageStats: Record<string, number>;
  repos: number;
  totalStars: number;
}

const GITHUB_USERNAME = "iceywu";
const EXCLUDED_LANGUAGES = new Set([
  "CSS",
  "HTML",
  "SCSS",
  "Less",
  "Handlebars",
  "Makefile",
]);

const FALLBACK: GithubStats = {
  avatar: "",
  createdAt: "2020-01-01T00:00:00.000Z",
  languageStats: {},
  repos: 0,
  totalStars: 0,
};

const QUERY = `
  query GithubStats($login: String!, $allRepoLimit: Int!, $repoLimit: Int!, $languageLimit: Int!) {
    user(login: $login) {
      avatarUrl
      createdAt
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER, first: $allRepoLimit, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes { stargazerCount }
      }
      languageRepositories: repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: $repoLimit, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          isArchived
          primaryLanguage { name }
          languages(first: $languageLimit, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
    }
  }
`;

/**
 * 构建期拉取 GitHub 语言/仓库统计。
 * 无 token 或网络不可达时回退到默认值，保证页面可正常渲染。
 */
export async function getGithubStats(): Promise<GithubStats> {
  const token = import.meta.env.MY_TOKEN;
  if (!token) {
    return FALLBACK;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          login: GITHUB_USERNAME,
          allRepoLimit: 100,
          repoLimit: 12,
          languageLimit: 10,
        },
      }),
    });

    const json: any = await res.json();
    const user = json?.data?.user;
    if (!user) {
      return FALLBACK;
    }

    let totalStars = 0;
    for (const repo of user.repositories?.nodes ?? []) {
      totalStars += repo?.stargazerCount ?? 0;
    }

    const candidates = (user.languageRepositories?.nodes ?? []).filter(
      (repo: any) => repo && !repo.isArchived
    );

    const byteCount: Record<string, number> = {};
    for (const repo of candidates) {
      for (const edge of repo.languages?.edges ?? []) {
        const lang = edge?.node?.name;
        const bytes = edge?.size;
        if (!lang || typeof bytes !== "number" || EXCLUDED_LANGUAGES.has(lang)) {
          continue;
        }
        byteCount[lang] = (byteCount[lang] ?? 0) + bytes;
      }
    }

    return {
      avatar: user.avatarUrl ?? "",
      createdAt: user.createdAt ?? FALLBACK.createdAt,
      languageStats: Object.fromEntries(
        Object.entries(byteCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 12)
      ),
      repos: user.repositories?.totalCount ?? 0,
      totalStars,
    };
  } catch {
    return FALLBACK;
  }
}
