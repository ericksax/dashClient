"use client";
import { useContacts } from "@/store/contactsStore";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { Dialog } from "../dialog";
import { useRef } from "react";

type ContactProps = {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
};

type ContactCardProps = {
  contact: ContactProps;
};
const ContactCard = ({ contact }: ContactCardProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [deleteContact] = useContacts((state) => [
    state.deleteContact,
    state.setContacts,
  ]);
  function deleteClient() {
    fetch(`http://localhost:3333/contacts/${contact.id}`, {
      method: "DELETE",
    });
    deleteContact(contact.id);
  }

  function handleOpenModal() {
    modalRef.current?.showModal();
  }

  return (
    <div className="hover:bg-gray-800/[.4] border border-gray-700 p-6 rounded-md w-full max-w-4xl flex mt-8">
      <div className="flex justify-between items-center w-full h-22">
        <div className="flex flex-col justify-between h-full">
          <strong className="text-gray-400 text-xl">{contact.name}</strong>
          <span>
            <p className="text-sm text-gray-200">
              E-mail:{" "}
              <span className="text-gray-400 ml-2 ">{contact.email}</span>
            </p>
            <p className="text-sm text-gray-200">
              Telefone
              <span className="text-gray-400 ml-2">{contact.phone}</span>
            </p>
            <p className="text-sm text-gray-200">
              Desde:
              <span className="text-gray-400 ml-2">
                {new Date(contact.created_at).toLocaleDateString("pt-br")}
              </span>
            </p>
          </span>
        </div>
        <span className="flex flex-col justify-between h-full">
          <button
            onClick={handleOpenModal}
            className="bg-yellow-500/[.5] hover:bg-yellow-500/[.7] text-gray-100 px-4 rounded-md py-1"
          >
            <FiEdit3 size={20} />
          </button>
          <button
            onClick={() => deleteClient()}
            className="bg-red-500/[.5] hover:bg-red-500/[.7] text-gray-100 rounded-md px-4 py-1 flex items-center justify-center"
          >
            <FiTrash2 size={20} />
          </button>
        </span>
      </div>
      <Dialog edit={true} contact={contact} modalRef={modalRef} />
    </div>
  );
};

export default ContactCard;
