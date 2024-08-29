import { z } from 'zod';

import { MediaItemSchema } from '@src/schemas/global-schema';

export const PageSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  seoFullHead: z.string(),
  permalink: z.string().optional(),
  type: z.string(),
  thumbnail: MediaItemSchema.optional(),
  // taxonomies @TODO recheck if needed
  updatedAt: z.number(),
  createdAt: z.number(),
  publishedAt: z.number(),
  content: z.string(),
  rawContent: z.string(),
});

export type Page = z.infer<typeof PageSchema>;

export const PagePermalinks = PageSchema.pick({ permalink: true });
export const PageSlugs = PageSchema.pick({ slug: true });
