// import { OctokitCtx } from '../constants'
import type { Repo } from '~/types'

export default defineEventHandler(async () => {
  // const { data } = await OctokitCtx.rest.repos.listForAuthenticatedUser({
  //   per_page: 100,
  //   type: 'owner',
  //   sort: 'updated',
  // })
  const data = await $fetch<Repo[]>('https://api.github.com/users/iceywu/repos?per_page=100&type=owner&sort=updated')

  const publicRepos = data.filter(repo => !repo.private && !repo.archived)
  const publicAndNotForkRepos = publicRepos.filter(repo => !repo.fork)

  const repoGroups: Record<string, Repo[]> = {
    'Templates': filterRepos(publicAndNotForkRepos, 'template'),
    'Vite Ecosystem': filterRepos(publicAndNotForkRepos, 'vite'),
    // 'Plugins': filterRepos(publicAndNotForkRepos, 'plugin'),
    // 'Presets': filterRepos(publicAndNotForkRepos, 'preset'),
    'Utils': filterRepos(publicAndNotForkRepos, 'util'),
    'UnoCSS': filterRepos(publicRepos, 'unocss'),
    // 'UI': filterRepos(publicRepos, 'ui'),
    // 'Config': filterRepos(publicAndNotForkRepos, 'config'),
    // 'Component': filterRepos(publicAndNotForkRepos, 'component'),
    // 'Games': filterRepos(publicAndNotForkRepos, 'game'),
    'All': publicAndNotForkRepos,
  }

  return repoGroups
})

function filterRepos(repos: Repo[], key: string) {
  return repos.filter(repo => repo.topics && repo.topics.includes(key))
}
