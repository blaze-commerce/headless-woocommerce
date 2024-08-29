import { z } from 'zod';

import { MediaItemSchema } from '@src/schemas/global-schema';

export const TaxonomySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string().optional(),
  description: z.string(),
  type: z.string(),
  seoFullHead: z.string(),
  permalink: z.string().optional(),
  updatedAt: z.number(),
  bannerThumbnail: MediaItemSchema,
  bannerText: z.string(),
  parentTerm: z.string(),
  breadcrumbs: z.array(z.record(z.string())),
  metaData: z.array(z.record(z.string())),
  thumbnail: MediaItemSchema.optional(),
  productCount: z.number().optional(),
});

export type Taxonomy = z.infer<typeof TaxonomySchema>;

export const TaxonomyPermalink = TaxonomySchema.pick({ permalink: true });

export const SubCategorySchema = TaxonomySchema.pick({
  name: true,
  permalink: true,
  productCount: true,
  thumbnail: true,
});

export type SubCategory = z.infer<typeof SubCategorySchema>;
