import { z } from 'zod';

import { CartItemSchema } from '@src/lib/actions/add-to-cart/schema';

export type AddToCartItemResponse = z.infer<typeof CartItemSchema>;
