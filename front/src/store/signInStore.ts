import { FieldValues } from "react-hook-form";
import { create } from "zustand";

type AuthProps = {
  token: string;
  signIn: (formData: FieldValues) => Promise<void>;
};

export const useAuth = create<AuthProps>((set) => ({
  token: "",
  signIn: async (formData: FieldValues) => {
    try {
      const result: Response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json();

      localStorage.setItem("@tokenClient", data.token);
      localStorage.setItem("@idClient", data.id);
    } catch (err) {
      console.log(err);
    }
  },
  signOut: () => {
    localStorage.removeItem("@tokenClient");
    localStorage.removeItem("@idClient");
  },

  isLogged: () => {
    return localStorage.getItem("@tokenClient") ? true : false;
  },
}));
