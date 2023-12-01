import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { Fragment, useState } from "react";

type Contact = {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
};

type Client = {
  client: {
    name: string;
    email: string;
    phone: string;
    created_at: string;
    id: string;
    contacts: Contact[];
  };
};

const ContactDetails = ({ client }: Client) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowOptions = () => {
    setIsOpen(!isOpen);
  };
  return (
    <main className="bg-slate-500 text-gray-50 rounded-md mb-2">
      <div className="flex items-center justify-between w-full px-4">
        {isOpen ? (
          <CaretDown onClick={handleShowOptions} className="cursor-pointer" />
        ) : (
          <CaretRight onClick={handleShowOptions} className="cursor-pointer" />
        )}
        <span>{client.name}</span>
        <span>{client.email}</span>
      </div>
      {isOpen
        ? client.contacts.map((contact) => {
            return (
              <Fragment key={contact.id}>
                <div className="flex flex-col bg-slate-600  w-full p-4">
                  <strong>{contact.name}</strong>
                  <p className="text-sm text-slate-300">Tel: {contact.phone}</p>
                  <p className="text-sm  text-slate-300">
                    E-mail: {contact.email}
                  </p>
                  <p className="text-sm  text-slate-300">
                    Desde: {contact.created_at}
                  </p>
                </div>
              </Fragment>
            );
          })
        : null}
    </main>
  );
};
export default ContactDetails;
