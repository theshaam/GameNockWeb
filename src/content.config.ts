import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Case studies: add a Markdown file to src/content/work/ to publish a new one.
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) => z.object({
    name: z.string(), short: z.string(), img: image(), category: z.string(),
    platforms: z.string().default(''), engagement: z.string(), tags: z.string(),
    card: z.array(z.string()), facts: z.array(z.tuple([z.string(), z.string()])),
    overview: z.string(), challenge: z.string(), role: z.array(z.string()), tech: z.string(),
    outcome: z.array(z.string()), services: z.array(z.string()),
    order: z.number().optional(),
  }),
});

// Articles: add a Markdown file to src/content/insights/ to publish a new one.
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: ({ image }) => z.object({
    title: z.string(), cat: z.string(), date: z.string(), img: image(), mins: z.number(),
    intro: z.string(), service: z.string(),
  }),
});

export const collections = { work, insights };
