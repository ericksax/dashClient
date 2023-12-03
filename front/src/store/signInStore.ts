import { configObjectToasty } from "@/constantes";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { create } from "zustand";

type AuthProps = {
  token: string;
  signIn: (formData: FieldValues) => Promise<void>;
};

export const useAuth = create<AuthProps>((set) => ({
  token: "",
  signIn: async (formData: FieldValues) => {
    try {
      await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async (result) => {
        if (result.status === 200) {
          toast.success("Login realizado com sucesso", {
            ...configObjectToasty,
          });

          const data = await result.json();
          localStorage.setItem("@tokenClient", data.token);
          localStorage.setItem("@idClient", data.id);
        } else {
          toast.error("E-mail ou senha inválidos", configObjectToasty);
        }
      });
    } catch (err) {
      toast.error("Servidor não responde.", configObjectToasty);
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
