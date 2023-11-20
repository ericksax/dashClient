import { ContactService } from "../services/contact.service";
import { Request, Response } from "express";

class ContactController {
  constructor(public contactService: ContactService) {}

  async create(req: Request, res: Response) {
    const { user_id } = res.locals;
    const data = req.body;
    const contact = await this.contactService.create(user_id, data);
    return res.json(contact);
  }

  async update(req: Request, res: Response) {
    const { contact_id, data } = req.body;
    const contact = await this.contactService.update(contact_id, data);
    return res.json(contact);
  }

  async remove(req: Request, res: Response) {
    const { contact_id } = req.body;
    await this.contactService.remove(contact_id);
    return res.status(204).send();
  }
}
