import { z } from "zod";

const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.string().min(1),
});

const contactRequestSchema = contactSchema.omit({
  id: true,
});

const contactsResponseSchema = z.array(contactSchema);

const contactUpdateSchema = contactRequestSchema.partial();

export {
  contactRequestSchema,
  contactUpdateSchema,
  contactsResponseSchema,
  contactSchema,
};
