import { z } from "zod";
const formEditZodSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});
export { formEditZodSchema };
export type FormEditContactValues = z.infer<typeof formEditZodSchema>;
