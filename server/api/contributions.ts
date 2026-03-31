import { useOctokit } from "../utils/github";

type ContributedRepo = {
	name: string;
	fullName: string;
	description: string | null;
	url: string;
	stars: number;
	language: string | null;
	owner: {
		login: string;
		avatarUrl: string;
	};
};

const CACHE_TTL = 60 * 60 * 1000;
let cachedData: ContributedRepo[] | null = null;
let cachedAt = 0;

export default defineEventHandler(async () => {
	const now = Date.now();
	if (cachedData && now - cachedAt < CACHE_TTL) {
		return cachedData;
	}

	const config = useRuntimeConfig();
	const octokit = useOctokit(config.githubToken);

	// Get all merged PRs authored by the user (excluding their own repos)
	const { data: prData } = await octokit.rest.search.issuesAndPullRequests({
		q: "author:iceywu type:pr is:merged -user:iceywu",
		per_page: 100,
	});

	// Extract unique repository names (owner/repo)
	const repoNames = [
		...new Set(
			prData.items.map((i) =>
				i.repository_url.replace("https://api.github.com/repos/", ""),
			),
		),
	];

	// Fetch details for each repository
	const repoDetailsPromises = repoNames.map((fullName) => {
		const [owner, repo] = fullName.split("/");
		if (!owner || !repo) return Promise.resolve(null);
		return octokit.rest.repos.get({ owner, repo }).catch(() => null);
	});

	const repoResponses = await Promise.all(repoDetailsPromises);

	cachedData = repoResponses
		.filter((res): res is NonNullable<typeof res> => Boolean(res))
		.map(({ data: repo }) => ({
			name: repo.name,
			fullName: repo.full_name,
			description: repo.description,
			url: repo.html_url,
			stars: repo.stargazers_count,
			language: repo.language,
			owner: {
				login: repo.owner.login,
				avatarUrl: repo.owner.avatar_url,
			},
		}));

	cachedAt = now;
	return cachedData;
});
