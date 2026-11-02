import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
    github: z.string().optional(),
    // 'coming-soon' projects render without a link and open the "coming soon" overlay.
    status: z.enum(['live', 'coming-soon']).default('live'),
    // Panel size on the homepage grid ('lg' spans two columns).
    size: z.enum(['sm', 'md', 'lg']).default('md'),
    order: z.number().default(0),
  }),
});

export const collections = { blog, projects };
