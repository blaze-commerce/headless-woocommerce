import { z } from 'zod';

export const PageSchema = z.object({
  id: z.string(),
  name: z.string(),
  permalink: z.string(),
  publishedAt: z.number(),
  seoFullHead: z.string(),
  slug: z.string(),
  type: z.string(),
  content: z.string(),
  // @TODO: Add type for taxonomies and thumbnail
  // taxonomies: [],
  // thumbnail: [],
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type Page = z.infer<typeof PageSchema>;

export const SiteInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  updated_at: z.number(),
});

export type SiteInfo = z.infer<typeof SiteInfoSchema>;
