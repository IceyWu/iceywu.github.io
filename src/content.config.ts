import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date(),
    description: z.string().optional().default(""),
    draft: z.boolean().optional().default(false),
    lang: z.string().optional().default("zh-cn"),
    tags: z.array(z.string()).optional().default([]),
    title: z.string(),
  }),
});

const essays = defineCollection({
  loader: glob({ base: "./src/content/essays", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date(),
    description: z.string().optional().default(""),
    draft: z.boolean().optional().default(false),
    lang: z.string().optional().default("zh-cn"),
    tags: z.array(z.string()).optional().default([]),
    title: z.string(),
  }),
});

export const collections = { essays, posts };
