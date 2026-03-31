import type { Repo } from "~/types";
import { useOctokit } from "../utils/github";

const CACHE_TTL = 60 * 60 * 1000;
let cachedData: Record<string, Repo[]> | null = null;
let cachedAt = 0;

export default defineEventHandler(async () => {
	const now = Date.now();
	if (cachedData && now - cachedAt < CACHE_TTL) {
		return cachedData;
	}

	const config = useRuntimeConfig();
	const octokit = useOctokit(config.githubToken);

	const { data } = await octokit.request("GET /users/{username}/repos", {
		username: "iceywu",
		per_page: 100,
		type: "owner",
		sort: "updated",
	});

	const publicRepos = (data as Repo[]).filter(
		(repo) => !repo.private && !repo.archived,
	);
	const publicAndNotForkRepos = publicRepos.filter((repo) => !repo.fork);

	const repoGroups: Record<string, Repo[]> = {
		Templates: filterRepos(publicAndNotForkRepos, "template"),
		"Vite Ecosystem": filterRepos(publicAndNotForkRepos, "vite"),
		Utils: filterRepos(publicAndNotForkRepos, "util"),
		UnoCSS: filterRepos(publicRepos, "unocss"),
		All: publicAndNotForkRepos,
	};

	cachedData = Object.fromEntries(
		Object.entries(repoGroups).filter(([_, repos]) => repos.length > 0),
	);
	cachedAt = now;

	return cachedData;
});

function filterRepos(repos: Repo[], key: string) {
	return repos
		.filter((repo) => repo.topics?.includes(key))
		.sort((a, b) => {
			return a.stargazers_count > b.stargazers_count ? -1 : 1;
		});
}
