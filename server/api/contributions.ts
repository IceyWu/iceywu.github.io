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

type GraphQLResponse = {
	user: {
		repositoriesContributedTo: {
			nodes: Array<{
				name: string;
				nameWithOwner: string;
				description: string | null;
				url: string;
				stargazerCount: number;
				primaryLanguage: {
					name: string;
				} | null;
				owner: {
					login: string;
					avatarUrl: string;
				};
			} | null> | null;
		};
	} | null;
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

	const result = await octokit.graphql<GraphQLResponse>(
		`
			query ContributedRepos($login: String!) {
				user(login: $login) {
					repositoriesContributedTo(
						first: 50
						contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]
						orderBy: { field: STARGAZERS, direction: DESC }
					) {
						nodes {
							name
							nameWithOwner
							description
							url
							stargazerCount
							primaryLanguage {
								name
							}
							owner {
								login
								avatarUrl
							}
						}
					}
				}
			}
		`,
		{ login: "iceywu" },
	);

	const nodes = result.user?.repositoriesContributedTo?.nodes || [];

	cachedData = nodes
		.filter((repo): repo is NonNullable<typeof repo> => Boolean(repo))
		.map((repo) => ({
			name: repo.name,
			fullName: repo.nameWithOwner,
			description: repo.description,
			url: repo.url,
			stars: repo.stargazerCount,
			language: repo.primaryLanguage?.name || null,
			owner: {
				login: repo.owner.login,
				avatarUrl: repo.owner.avatarUrl,
			},
		}));

	cachedAt = now;
	return cachedData;
});
