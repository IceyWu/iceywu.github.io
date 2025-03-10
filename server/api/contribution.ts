import type { ContributeData } from '~/types'
// import { useOctokit } from '../utils/github'

export default defineEventHandler(async (event) => {
  const { name, year } = getQuery(event)
  const API = `https://github-contributions-api.jogruber.de/v4/${name}?y=${year}`
  return $fetch<ContributeData>(API)
  // const { name, year } = getQuery(event)
  // const octokit = useOctokit()
  // try {
  //   const response = await octokit.request('GET /users/{username}/events', {
  //     username: name as string,
  //     per_page: 100,
  //   })

  //   const contributions = response.data.filter((d) => {
  //     const eventYear = new Date(d.created_at!).getFullYear()
  //     return eventYear === Number.parseInt(year as string, 10)
  //   })

  //   return contributions
  // }
  // catch (error) {
  //   console.error('Error fetching contributions:', error)
  //   throw error
  // }
})
