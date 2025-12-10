import type { Repo } from "~/types";
// import { useOctokit } from '../utils/github'

export default defineEventHandler(async () => {
	// const { data } = await useOctokit().request('GET /user/repos', { per_page: 100 })
	const data = await $fetch<Repo[]>(
		"https://api.github.com/users/iceywu/repos?per_page=100&type=owner&sort=updated",
	);

	const publicRepos = data.filter((repo) => !repo.private && !repo.archived);
	const publicAndNotForkRepos = publicRepos.filter((repo) => !repo.fork);

	const repoGroups: Record<string, Repo[]> = {
		Templates: filterRepos(publicAndNotForkRepos, "template"),
		"Vite Ecosystem": filterRepos(publicAndNotForkRepos, "vite"),
		Utils: filterRepos(publicAndNotForkRepos, "util"),
		UnoCSS: filterRepos(publicRepos, "unocss"),
		All: publicAndNotForkRepos,
	};

	return Object.fromEntries(
		Object.entries(repoGroups).filter(([_, repos]) => repos.length > 0),
	);
});

function filterRepos(repos: Repo[], key: string) {
	return repos
		.filter((repo) => repo.topics?.includes(key))
		.sort((a, b) => {
			return a.stargazers_count > b.stargazers_count ? -1 : 1;
		});
}
