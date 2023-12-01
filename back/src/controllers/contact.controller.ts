import { ContactRequest, ContactUpdate } from "../interfaces/contact.interface";
import { ContactService } from "../services/contact.service";
import { Request, Response } from "express";

class ContactController {
  constructor(public contactService: ContactService) {}

  async create(req: Request, res: Response) {
    const { id } = req.params;
    const data: ContactRequest = req.body;
    const contact = await this.contactService.create(id, data);
    return res.json(contact);
  }

  async update(req: Request, res: Response) {
    const { contact_id } = req.params;
    const data: ContactUpdate = req.body;
    const contact = await this.contactService.update(contact_id, data);
    return res.json(contact);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await this.contactService.remove(id);
    return res.status(204).send();
  }

  async listContactsByUser(req: Request, res: Response) {
    const { user_id } = res.locals;
    const contacts = await this.contactService.listByUser(user_id);
    return res.json(contacts);
  }

  async listAll(req: Request, res: Response) {
    const contacts = await this.contactService.list();
    return res.json(contacts);
  }
}

export { ContactController };
