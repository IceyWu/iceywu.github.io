type GithubUser = {
	avatar_url?: string;
	created_at?: string;
	public_repos?: number;
};

type GithubRepo = {
	archived?: boolean;
	fork?: boolean;
	language?: string | null;
	name: string;
	private?: boolean;
	stargazers_count?: number;
};

type GithubStatsResponse = {
	avatar: string;
	createdAt: string;
	languageStats: Record<string, number>;
	repos: number;
	totalStars: number;
};

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_CACHE_TTL = 60 * 60 * 1000;
const GITHUB_LANGUAGE_REPO_LIMIT = 12;
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

function getGithubHeaders(token?: string) {
	return {
		Accept: "application/vnd.github+json",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
}

async function githubFetch<T>(path: string, token?: string) {
	return await $fetch<T>(`${GITHUB_API_BASE}${path}`, {
		headers: getGithubHeaders(token),
	});
}

async function fetchGithubStats(token?: string): Promise<GithubStatsResponse> {
	const [user, repos] = await Promise.all([
		githubFetch<GithubUser>("/users/iceywu", token),
		githubFetch<GithubRepo[]>(
			"/users/iceywu/repos?per_page=100&type=owner&sort=updated",
			token,
		),
	]);

	let totalStars = 0;
	for (const repo of repos) {
		totalStars += repo.stargazers_count || 0;
	}

	const candidates = repos
		.filter((repo) => !repo.private && !repo.archived && !repo.fork)
		.slice(0, GITHUB_LANGUAGE_REPO_LIMIT);

	const languageResults = await Promise.allSettled(
		candidates.map((repo) =>
			githubFetch<Record<string, number>>(
				`/repos/iceywu/${repo.name}/languages`,
				token,
			),
		),
	);

	const byteCount: Record<string, number> = {};
	for (const result of languageResults) {
		if (result.status === "fulfilled") {
			for (const [lang, bytes] of Object.entries(result.value)) {
				if (EXCLUDED_LANGUAGES.has(lang)) {
					continue;
				}

				byteCount[lang] = (byteCount[lang] || 0) + bytes;
			}
		}
	}

	if (Object.keys(byteCount).length === 0) {
		for (const repo of candidates) {
			if (!repo.language || EXCLUDED_LANGUAGES.has(repo.language)) {
				continue;
			}

			byteCount[repo.language] = (byteCount[repo.language] || 0) + 1;
		}
	}

	return {
		avatar: user.avatar_url || "",
		createdAt: user.created_at || "2020-01-01T00:00:00.000Z",
		languageStats: Object.fromEntries(
			Object.entries(byteCount)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 6),
		),
		repos: user.public_repos || 0,
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
