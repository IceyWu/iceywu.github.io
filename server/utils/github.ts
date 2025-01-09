import { Octokit } from 'octokit'

let _octokit: Octokit

export function useOctokit() {
  // eslint-disable-next-line no-console
  console.log('🌳-----process.env-----', process.env)
  if (!_octokit) {
    _octokit = new Octokit({
      auth: process.env.MY_TOKEN,
    })
  }
  return _octokit
}
