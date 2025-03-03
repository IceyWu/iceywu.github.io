// import { useOctokit } from '../utils/github'

import type { User } from '~/types'

export default defineEventHandler(() => {
  const defaultData: any = {
    avatar_url: 'https://avatars.githubusercontent.com/u/66096254?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/IceyWu',
    html_url: 'https://github.com/IceyWu',
    name: 'Icey Wu',
    company: null,
    blog: 'https://iceywu.github.io/',
    location: 'Chengdu, China',
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 60,
    public_gists: 0,
    followers: 30,
    following: 19,
    created_at: '2020-05-28T23:35:36Z',
    updated_at: '2024-12-23T16:20:27Z',
  }
  // const { data } = await useOctokit().request('GET /user')
  // return (
  //   data || defaultData
  // )
  return $fetch<User>('https://api.github.com/users/iceywu') || defaultData
})
