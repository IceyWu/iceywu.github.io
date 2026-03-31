import type { User } from "~/types";
import { useOctokit } from "../utils/github";

const CACHE_TTL = 60 * 60 * 1000;
let cachedUser: User | null = null;
let cachedAt = 0;

const defaultData: User = {
	avatar_url: "https://avatars.githubusercontent.com/u/66096254?v=4",
	gravatar_id: "",
	url: "https://api.github.com/users/IceyWu",
	html_url: "https://github.com/IceyWu",
	name: "Icey Wu",
	company: null,
	blog: "https://iceywu.github.io/",
	location: "Chengdu, China",
	email: null,
	hireable: null,
	bio: null,
	twitter_username: null,
	public_repos: 60,
	public_gists: 0,
	followers: 30,
	following: 19,
	created_at: "2020-05-28T23:35:36Z",
	updated_at: "2024-12-23T16:20:27Z",
};

export default defineEventHandler(async () => {
	const now = Date.now();
	if (cachedUser && now - cachedAt < CACHE_TTL) {
		return cachedUser;
	}

	const config = useRuntimeConfig();
	const octokit = useOctokit(config.githubToken);

	try {
		const { data } = await octokit.request("GET /users/{username}", {
			username: "iceywu",
		});
		cachedUser = data as User;
		cachedAt = now;
		return cachedUser;
	} catch {
		return defaultData;
	}
});
