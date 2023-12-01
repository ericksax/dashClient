"use client";

import ContactCard from "@/components/contactCard";
import { Dialog } from "@/components/dialog";
import { useEffect, useRef } from "react";
import { useContacts } from "../../../store/contactsStore";
import { useClients } from "@/store/clientStore";

export default function Dash() {
  const id = window.localStorage.getItem("@idClient")!;
  const [setClient, client] = useClients((state) => [
    state.setClient,
    state.client,
  ]);
  const ref = useRef<HTMLDialogElement>(null);
  const [setContacts, contacts] = useContacts((state) => [
    state.setContacts,
    state.contacts,
  ]);

  const handleClick = () => {
    ref.current?.showModal();
  };
  const fetchData = async () => {
    const result = await fetch(`http://localhost:3333/users/${id}`, {
      cache: "no-cache",
    });

    const data = await result.json();
    setContacts(data.contacts);
    setClient(data);
    console.log(client);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-col h-[calc(100vh-97px)] max-w-4xl m-auto px-4">
      <div className="flex justify-between items-center mt-32">
        <h1 className="text-4xl px-4">Contatos</h1>
        <button
          onClick={handleClick}
          className="border border-gray-200 text-gray-200 p-2 rounded-md hover:bg-gray-300 hover:text-gray-900 hover:transition-all delay-75"
        >
          + Novo Contato
        </button>
      </div>
      <section className="flex flex-col gap-4">
        {contacts?.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
      </section>
      <Dialog modalRef={ref} />
    </main>
  );
}
