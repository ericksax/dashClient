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
import {
  contactSchema,
  contactsResponseSchema,
} from "../schemas/contact.schema";

class ContactService {
  async create(userId: string, data: ContactRequest) {
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

    await contactRepository.save(contact);

    return userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        contacts: true,
      },
    });
  }

  async list() {
    const contacts = await contactRepository.find();
    return contactsResponseSchema.parse(contacts);
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

  listByUser(user_id: string) {
    const user = userRepository.findOne({
      where: {
        id: user_id,
      },
      relations: {
        contacts: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export { ContactService };
