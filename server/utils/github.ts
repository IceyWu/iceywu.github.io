import { Octokit } from "octokit";

let _octokit: Octokit;

export function useOctokit() {
	if (!_octokit) {
		_octokit = new Octokit({
			auth: process.env.MY_TOKEN,
		});
	}
	return _octokit;
}
