import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // Empty = use the default share image from Site settings → Branding
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    cta: z
      .object({ label: z.string(), href: z.string() })
      .default({ label: 'Plan your stay', href: '/contact/' }),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
