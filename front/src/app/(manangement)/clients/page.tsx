"use client";
import ContactDetails from "@/components/contactDetails/page";
import { useClients } from "@/store/clientStore";
import { useEffect, useCallback } from "react";

const Client = () => {
  const [clients, setClients] = useClients((state) => [
    state.clients,
    state.setClients,
  ]);
  const fetchData = useCallback(async () => {
    const result = await fetch("http://localhost:3333/users", {
      cache: "no-cache",
    });
    const data = await result.json();
    setClients(data);
  },[setClients]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="flex flex-col mt-24 max-w-4xl m-auto">
      {clients.map((client) => (
        <ContactDetails key={client.id} client={client} />
      ))}
    </main>
  );
};

export default Client;
