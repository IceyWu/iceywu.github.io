import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date(),
    description: z.string().optional().default(""),
    draft: z.boolean().optional().default(false),
    lang: z.enum(["zh-CN", "en"]).default("zh-CN"),
    route: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    tags: z.array(z.string()).optional().default([]),
    title: z.string(),
    translationKey: z.string(),
  }),
});

const essays = defineCollection({
  loader: glob({ base: "./src/content/essays", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date(),
    description: z.string().optional().default(""),
    draft: z.boolean().optional().default(false),
    lang: z.enum(["zh-CN", "en"]).default("zh-CN"),
    route: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    tags: z.array(z.string()).optional().default([]),
    title: z.string(),
    translationKey: z.string(),
  }),
});

export const collections = { essays, posts };
