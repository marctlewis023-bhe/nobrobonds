import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string().default('NoBro Bonds'),
    authorCredentials: z.string().default('Commercial surety bond research and analysis'),
    category: z.enum(['transparency', 'education', 'industry', 'guides']),
    keywords: z.array(z.string()),
    readingTime: z.string(),
  }),
});

export const collections = { blog };
