import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type LoginType = z.infer<typeof loginSchema>;