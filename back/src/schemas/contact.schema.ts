import { z } from "zod";

const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.string().min(1),
  created_at: z.string().or(z.date()),
});

const contactRequestSchema = contactSchema.omit({
  id: true,
  created_at: true,
});

const contactsResponseSchema = z.array(contactSchema);

const contactUpdateSchema = contactRequestSchema.partial();

export {
  contactRequestSchema,
  contactUpdateSchema,
  contactsResponseSchema,
  contactSchema,
};
