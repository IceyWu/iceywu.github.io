import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    lang: z.string().optional().default("zh-cn"),
    draft: z.boolean().optional().default(false),
  }),
});

const essays = defineCollection({
  loader: glob({ base: "./src/content/essays", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    lang: z.string().optional().default("zh-cn"),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts, essays };
