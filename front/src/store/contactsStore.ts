import { create } from "zustand";

type Contacts = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

type ContactStore = {
  contacts: Contacts[];
  addContact: (contact: Contacts) => void;
  deleteContact: (id: string) => void;
  setContacts: (contacts: Contacts[]) => void;
};

export const useContacts = create<ContactStore>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}));
