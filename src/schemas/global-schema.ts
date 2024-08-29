import { z } from 'zod';

export const MediaItemSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  altText: z.string().optional(),
  sourceUrl: z.string().optional(),
  src: z.string().optional(), // we can only make this optional for now because other images are using sourceUrl instead
});
