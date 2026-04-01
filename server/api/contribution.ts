import type { ContributeData, Day, Level } from "~/types";
import { useOctokit } from "../utils/github";

type GithubContributionDay = {
	contributionCount: number;
	date: string;
	color: string;
};

type GithubContributionWeek = {
	contributionDays: GithubContributionDay[];
};

type GithubContributionCalendar = {
	totalContributions: number;
	weeks: GithubContributionWeek[];
};

type GithubContributionsResponse = {
	user: {
		contributionsCollection: {
			contributionCalendar: GithubContributionCalendar;
		};
	};
};

function colorToLevel(color: string): Level {
	// GitHub uses specific colors for contribution levels
	// Map them to 0-4 scale
	const levelMap: Record<string, Level> = {
		"#ebedf0": 0, // no contributions (light)
		"#9be9a8": 1,
		"#40c463": 2,
		"#30a14e": 3,
		"#216e39": 4,
		// dark mode colors
		"#161b22": 0,
		"#0e4429": 1,
		"#006d32": 2,
		"#26a641": 3,
		"#39d353": 4,
	};
	return (
		levelMap[color] ?? (color === "#ebedf0" || color === "#161b22" ? 0 : 2)
	);
}

const CACHE_TTL = 60 * 60 * 1000;
let cachedData: ContributeData | null = null;
let cachedAt = 0;

export default defineEventHandler(async () => {
	const now = Date.now();
	if (cachedData && now - cachedAt < CACHE_TTL) {
		return cachedData;
	}

	const config = useRuntimeConfig();
	const octokit = useOctokit(config.githubToken);

	const currentYear = new Date().getFullYear();
	const from = `${currentYear}-01-01T00:00:00Z`;
	const to = `${currentYear}-12-31T23:59:59Z`;

	const result = await octokit.graphql<GithubContributionsResponse>(
		`
		query($login: String!, $from: DateTime!, $to: DateTime!) {
			user(login: $login) {
				contributionsCollection(from: $from, to: $to) {
					contributionCalendar {
						totalContributions
						weeks {
							contributionDays {
								contributionCount
								date
								color
							}
						}
					}
				}
			}
		}
		`,
		{
			login: "iceywu",
			from,
			to,
		},
	);

	const calendar = result.user.contributionsCollection.contributionCalendar;

	const contributions: Day[] = calendar.weeks.flatMap((week) =>
		week.contributionDays.map((day) => ({
			date: day.date,
			count: day.contributionCount,
			level: colorToLevel(day.color),
		})),
	);

	cachedData = {
		total: {
			[currentYear]: calendar.totalContributions,
		},
		contributions,
	};
	cachedAt = now;

	return cachedData;
});
