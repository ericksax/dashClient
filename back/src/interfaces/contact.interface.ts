import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  contactRequestSchema,
  contactSchema,
  contactUpdateSchema,
  contactsResponseSchema,
} from "../schemas/contact.schema";
import { Contact } from "../entities/Contact";

type ContactRequest = z.infer<typeof contactRequestSchema>;
type ContactUpdate = DeepPartial<ContactRequest>;
type ContactResponse = z.infer<typeof contactSchema>;
type ContactsResponse = z.infer<typeof contactsResponseSchema>;

export { ContactRequest, ContactUpdate, ContactsResponse, ContactResponse };
