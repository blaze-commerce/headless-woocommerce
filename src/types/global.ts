import { z } from 'zod';

import { MediaItemSchema } from '@src/schemas/global-schema';

export type MediaItem = z.infer<typeof MediaItemSchema>;
