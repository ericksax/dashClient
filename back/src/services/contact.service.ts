import { Contact } from "../entities/Contact";
import { AppError } from "../errors/AppError";
import {
  ContactRequest,
  ContactResponse,
  ContactUpdate,
} from "../interfaces/contact.interface";
import {
  contactRepository,
  userRepository,
} from "../repositories/repositories";
import { contactSchema } from "../schemas/contact.schema";

class ContactService {
  async create(userId: string, data: ContactRequest): Promise<ContactResponse> {
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const contact: Contact = contactRepository.create({
      ...data,
      user,
    });

    await userRepository.save(contact);

    return contactSchema.parse(contact);
  }

  async update(
    contact_id: string,
    data: ContactUpdate
  ): Promise<ContactResponse> {
    const contact = await contactRepository.findOne({
      where: {
        id: contact_id,
      },
    });

    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    const updatedContact = contactRepository.create({
      ...contact,
      ...data,
    });

    await contactRepository.save(updatedContact);

    return contactSchema.parse(updatedContact);
  }

  async remove(contact_id: string) {
    const contact = await contactRepository.findOne({
      where: {
        id: contact_id,
      },
    });

    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    await contactRepository.remove(contact);
  }
}

export { ContactService };
