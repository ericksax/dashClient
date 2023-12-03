"use client";

import Input from "../inputs";
import FormErrorMessage from "@/components/formMessageError";
import { PulseLoader } from "react-spinners";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEditContactValues, formEditZodSchema } from "./formEditZodSchema";
import { RefObject } from "react";
import { toast } from "react-toastify";
import { useContacts } from "@/store/contactsStore";
import { configObjectToasty } from "@/constantes";

type ContactProps = {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
};

type DialogProps = {
  modalRef: RefObject<HTMLDialogElement>;
  contact?: ContactProps;
  edit?: boolean;
};

export const Dialog = ({ modalRef, contact, edit }: DialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormEditContactValues>({
    resolver: zodResolver(formEditZodSchema),
  });
  const [setContacts, contacts] = useContacts((state) => [
    state.setContacts,
    state.contacts,
  ]);
  const handleClose = () => {
    modalRef.current?.close();
    if (edit) {
      return;
    }
    reset({ name: "", email: "", phone: "" });
  };

  async function registerContact(formData: FieldValues) {
    try {
      const response = await fetch(`http://localhost:3333/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@tokenClient")!}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        toast.success("Contato criado com sucesso", {
          ...configObjectToasty,
        });
      } else {
        toast.error(
          "Erro ao criar contato, verifique os dados e tente novamente",
          {
            ...configObjectToasty,
          }
        );
      }
      const contact = await response.json();

      setContacts([...contacts, contact]);
    } catch (err) {
      console.log(err);
    }
    handleClose();
  }

  async function editContact(data: FieldValues, contact: ContactProps) {
    console.log(contact);
    const result = await fetch("http://localhost:3333/contacts/" + contact.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const updatedContact = await result.json();

    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );

    handleClose();
  }

  const submit = async (formData: FieldValues) => {
    try {
      if (edit) {
        await editContact(formData, contact!);
        return;
      }
      await registerContact(formData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <dialog
      ref={modalRef}
      open={false}
      className="absolute top-42 rounded-xl w-[420px] backdrop:bg-black/60 backdrop:backdrop-blur/10 z-20"
    >
      <div className="w-full bg-slate-600 relative">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-gray-800 p-8 rounded-md w-full  flex flex-col"
        >
          <button
            onClick={handleClose}
            className="text-white flex items-center justify-center text-xl absolute  top-4 left-4 px-3 pb-1 bg-white/[0.1] rounded-full hover:bg-white/[0.3] active:bg-white/[0.4] active:scale-90 transition-all"
          >
            x
          </button>
          <h1 className="text-2xl self-end text-white font-semibold mb-4">
            {edit ? "Editar Contato" : "Cadastrar Contato"}
          </h1>

          <div className="mb-4">
            <Input
              label="Nome"
              {...register("name")}
              defaultValue={contact?.name}
            />
          </div>
          <FormErrorMessage>
            {errors.name ? errors.name.message : null}
          </FormErrorMessage>
          <div className="mb-4">
            <Input
              label="E-mail"
              {...register("email")}
              defaultValue={contact?.email}
            />
          </div>
          <FormErrorMessage>
            {errors.email ? errors.email.message : null}
          </FormErrorMessage>
          <div className="mb-4">
            <Input
              defaultValue={contact?.phone}
              label="Telefone"
              {...register("phone")}
            />
          </div>
          <FormErrorMessage>
            {errors.phone ? errors.phone.message : null}
          </FormErrorMessage>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
          >
            {isSubmitting ? <PulseLoader color="white" /> : "Cadastrar"}
          </button>
        </form>
      </div>
    </dialog>
  );
};
