import { z } from "zod";
import { contactSchema, contactsResponseSchema } from "./contact.schema";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  contact: z.string(),
  password: z.string(),
  created_at: z.string().or(z.date()),
  contacts: z.array(contactSchema).optional(),
});

const userRequestSchema = userSchema.omit({
  id: true,
  created_at: true,
  contacts: true,
});

const userDetailsResponseSchema = userSchema
  .omit({
    password: true,
  })
  .extend({
    contacts: contactsResponseSchema,
  });

const userUpdateSchema = userRequestSchema.partial();
const usersResponseSchema = z.array(userDetailsResponseSchema);
const userResponseSchema = userSchema.omit({ password: true });
export {
  userRequestSchema,
  userDetailsResponseSchema,
  usersResponseSchema,
  userUpdateSchema,
  userResponseSchema,
};
