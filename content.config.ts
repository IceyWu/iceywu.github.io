import { defineCollection, z } from '@nuxt/content'

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/*.md',
    schema: z.object({
      date: z.string(),
      tags: z.array(z.string()),
      lang: z.string(),
      rawbody: z.string(),
    }),
  }),
  demos: defineCollection({
    type: 'page',
    source: 'demos/*.md',
    schema: z.object({
      link: z.string(),
      title: z.string(),
      description: z.string(),
      // date: z.string(),
      type: z.string(),
    }),
  }),
}
