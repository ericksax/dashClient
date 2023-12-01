import { create } from "zustand";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

type Client = {
  id: string;
  name: string;
  email: string;
  contact: string;
  created_at: string;
  contacts: Contact[];
};

type ClientProps = {
  client: Client;
  clients: Client[];
  setClients: (client: Client[]) => void;
  setClient: (client: Client) => void;
};

export const useClients = create<ClientProps>((set) => ({
  client: {} as Client,
  clients: [],
  setClient: (client) => set({ client }),
  setClients: (clients) => set({ clients }),
}));
