// import type { ContributeData } from '~/types'

export default defineEventHandler(async (event) => {
  const { name, year } = getQuery(event)
  const API = `https://github-contributions-api.jogruber.de/v4/${name}?y=${year}`
  return $fetch<ContributeData>(API)
})
