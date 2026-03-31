import { useOctokit } from "../utils/github";

type GithubStatsResponse = {
	avatar: string;
	createdAt: string;
	languageStats: Record<string, number>;
	repos: number;
	totalStars: number;
};

type GithubLanguageEdge = {
	node?: {
		name?: string | null;
	} | null;
	size?: number | null;
};

type GithubLanguageRepo = {
	isArchived?: boolean | null;
	primaryLanguage?: {
		name?: string | null;
	} | null;
	languages?: {
		edges?: Array<GithubLanguageEdge | null> | null;
	} | null;
};

type GithubGraphqlResponse = {
	user: {
		avatarUrl?: string | null;
		createdAt?: string | null;
		repositories: {
			totalCount?: number | null;
			nodes?: Array<{
				stargazerCount?: number | null;
			} | null> | null;
		};
		languageRepositories: {
			nodes?: Array<GithubLanguageRepo | null> | null;
		};
	} | null;
};

const GITHUB_USERNAME = "iceywu";
const GITHUB_CACHE_TTL = 60 * 60 * 1000;
const GITHUB_GRAPHQL_REPO_LIMIT = 100;
const GITHUB_LANGUAGE_REPO_LIMIT = 12;
const GITHUB_LANGUAGE_LIMIT_PER_REPO = 10;
const EXCLUDED_LANGUAGES = new Set([
	"CSS",
	"HTML",
	"SCSS",
	"Less",
	"Handlebars",
	"Makefile",
]);

let cachedStats: GithubStatsResponse | null = null;
let cachedAt = 0;
let pendingRequest: Promise<GithubStatsResponse> | null = null;

function getFallbackStats(): GithubStatsResponse {
	return {
		avatar: cachedStats?.avatar || "",
		createdAt: cachedStats?.createdAt || "2020-01-01T00:00:00.000Z",
		languageStats: cachedStats?.languageStats || {},
		repos: cachedStats?.repos || 0,
		totalStars: cachedStats?.totalStars || 0,
	};
}

async function fetchGithubStats(token?: string): Promise<GithubStatsResponse> {
	const octokit = useOctokit(token);
	const result = await octokit.graphql<GithubGraphqlResponse>(
		`
      query GithubStats($login: String!, $allRepoLimit: Int!, $repoLimit: Int!, $languageLimit: Int!) {
        user(login: $login) {
          avatarUrl
          createdAt
          repositories(
            privacy: PUBLIC
            ownerAffiliations: OWNER
            first: $allRepoLimit
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            totalCount
            nodes {
              stargazerCount
            }
          }
          languageRepositories: repositories(
            privacy: PUBLIC
            ownerAffiliations: OWNER
            isFork: false
            first: $repoLimit
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            nodes {
              isArchived
              primaryLanguage {
                name
              }
              languages(first: $languageLimit, orderBy: { field: SIZE, direction: DESC }) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
		{
			allRepoLimit: GITHUB_GRAPHQL_REPO_LIMIT,
			languageLimit: GITHUB_LANGUAGE_LIMIT_PER_REPO,
			login: GITHUB_USERNAME,
			repoLimit: GITHUB_LANGUAGE_REPO_LIMIT,
		},
	);

	const user = result.user;

	if (!user) {
		throw new Error("GitHub user not found");
	}

	let totalStars = 0;
	for (const repo of user.repositories.nodes || []) {
		totalStars += repo?.stargazerCount || 0;
	}

	const candidates = (user.languageRepositories.nodes || []).filter(
		(repo): repo is GithubLanguageRepo => Boolean(repo) && !repo.isArchived,
	);

	const byteCount: Record<string, number> = {};
	for (const repo of candidates) {
		for (const edge of repo.languages?.edges || []) {
			const lang = edge?.node?.name;
			const bytes = edge?.size;

			if (!lang || typeof bytes !== "number" || EXCLUDED_LANGUAGES.has(lang)) {
				continue;
			}

			byteCount[lang] = (byteCount[lang] || 0) + bytes;
		}
	}

	if (Object.keys(byteCount).length === 0) {
		for (const repo of candidates) {
			const primaryLanguage = repo.primaryLanguage?.name;

			if (!primaryLanguage || EXCLUDED_LANGUAGES.has(primaryLanguage)) {
				continue;
			}

			byteCount[primaryLanguage] = (byteCount[primaryLanguage] || 0) + 1;
		}
	}

	return {
		avatar: user.avatarUrl || "",
		createdAt: user.createdAt || "2020-01-01T00:00:00.000Z",
		languageStats: Object.fromEntries(
			Object.entries(byteCount)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 6),
		),
		repos: user.repositories.totalCount || 0,
		totalStars,
	};
}

export default defineEventHandler(async () => {
	const config = useRuntimeConfig();
	const githubToken = config.githubToken;
	const now = Date.now();

	if (cachedStats && now - cachedAt < GITHUB_CACHE_TTL) {
		return cachedStats;
	}

	if (!pendingRequest) {
		pendingRequest = fetchGithubStats(githubToken)
			.then((stats) => {
				cachedStats = stats;
				cachedAt = Date.now();
				return stats;
			})
			.catch(() => {
				return getFallbackStats();
			})
			.finally(() => {
				pendingRequest = null;
			});
	}

	return await pendingRequest;
});
