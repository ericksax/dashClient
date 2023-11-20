import { AppDataSource } from "../data-source";
import { Contact } from "../entities/Contact";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);
const contactRepository = AppDataSource.getRepository(Contact);
export { userRepository, contactRepository };
