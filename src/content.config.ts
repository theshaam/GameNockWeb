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
    // Set true to keep a case study in the repo but hide it from the site
    // (no listing card, no /work/<slug>/ page) until it's ready to publish.
    draft: z.boolean().optional(),
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

// Genre / role landing pages: one page per specific buyer search intent
// (e.g. "web3 game development", "hire unity developers"), each backed by
// real case studies and tech already used elsewhere on the site. Add a
// Markdown file to src/content/genres/ to publish a new one.
const genres = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/genres' }),
  schema: z.object({
    title: z.string(), metaTitle: z.string(), eyebrow: z.string(), h1: z.string(),
    lede: z.string(), intro: z.string(),
    problems: z.array(z.string()), deliverables: z.array(z.string()),
    tech: z.array(z.tuple([z.string(), z.string()])),
    relatedWork: z.array(z.string()), relatedService: z.string(),
    faq: z.array(z.tuple([z.string(), z.string()])),
    order: z.number().optional(),
  }),
});

export const collections = { work, insights, genres };
