import { Octokit } from "octokit";

let _octokit: Octokit | null = null;
let _cachedToken: string | undefined;

export function useOctokit(token?: string) {
	if (!_octokit || _cachedToken !== token) {
		_octokit = new Octokit(token ? { auth: token } : {});
		_cachedToken = token;
	}
	return _octokit;
}
