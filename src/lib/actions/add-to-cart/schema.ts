import { z } from 'zod';

import { MediaItemSchema } from '@src/schemas/global-schema';

export const CartItemProductSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  type: z.string().optional(),
  slug: z.string().optional(),
  price: z.string().optional(),
  image: MediaItemSchema.optional(),
});

const CartItemToProductConnectionEdgeSchema = z.object({
  node: CartItemProductSchema,
  __typename: z.literal('CartItemToProductConnectionEdge'),
});

export const CartItemSchema = z.object({
  product: CartItemToProductConnectionEdgeSchema,
  quantity: z.number(),
  subtotal: z.string(),
  subtotalTax: z.string(),
  tax: z.string(),
  total: z.string(),
  totalRaw: z.string(),
});
