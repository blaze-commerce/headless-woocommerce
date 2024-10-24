import { z } from 'zod';

export const FormSucessSchema = z.object({
  is_valid: z.literal(true),
  confirmation_message: z.string(),
  confirmation_type: z.string(),
  entry_id: z.string().optional(),
  page_number: z.number().optional(),
});

export const FormErrorSchema = z.object({
  is_valid: z.literal(false),
  validation_messages: z.record(z.string()).optional(),
  message: z.string().optional(),
});

export const FormResponseSchema = FormSucessSchema.or(FormErrorSchema);

export type FormResponseType = z.infer<typeof FormResponseSchema>;
