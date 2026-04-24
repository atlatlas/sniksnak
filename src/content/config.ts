import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['binnenland', 'buitenland', 'tech', 'sport', 'column']),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    readTime: z.number().optional(),
  }),
});

export const collections = { articles };
