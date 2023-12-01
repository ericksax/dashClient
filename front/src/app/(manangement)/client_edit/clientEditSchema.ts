import { z } from "zod";

export const clientEditSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4),
  contact: z.string().min(1),
});

export type ClientEditFormValues = z.infer<typeof clientEditSchema>;
