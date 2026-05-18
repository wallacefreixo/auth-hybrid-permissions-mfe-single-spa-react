import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type TRegisterFormData = z.infer<typeof registerSchema>;
