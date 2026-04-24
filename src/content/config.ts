import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['binnenland', 'buitenland', 'tech', 'sport', 'column']),
    lang: z.enum(['en', 'nl']).default('en'),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    readTime: z.number().optional(),
  }),
});

export const collections = { articles };
