"use client";
import FormErrorMessage from "@/components/formMessageError";
import Input from "@/components/inputs";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientEditFormValues, clientEditSchema } from "./clientEditSchema";
import { useClients } from "@/store/clientStore";
import { toast } from "react-toastify";
import { configObjectToasty } from "@/constantes";
import { useRouter } from "next/navigation";

const EditClient = () => {
  const client = useClients((state) => state.client);
  const { push } = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ClientEditFormValues>({
    resolver: zodResolver(clientEditSchema),
  });

  const handleDeleteClient = async (client_id: string) => {
    try {
      await fetch("http://localhost:3333/users/" + client_id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((result) => {
        if (result.status === 204) {
          toast.success("Usuário deletado com sucesso", {
            ...configObjectToasty,
          });

          localStorage.removeItem("@idClient");
          localStorage.removeItem("@tokenClient");

          push("/");
        } else {
          toast.error("Não foi possível deletar o usuário", configObjectToasty);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (formValues: FieldValues) => {
    try {
      const result = await fetch("http://localhost:3333/users/" + client.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const user = await result.json();

      if (result.status == 200) {
        toast.success("Usuário editado com sucesso", configObjectToasty);
      } else {
        toast.error("Não foi possível editar o usuário", configObjectToasty);
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "Não foi possível editar o usuário, tente mais tarde.",
        configObjectToasty
      );
    }
  };

  return (
    <main className="flex flex-col max-w-4xl m-auto bg-gray-800 p-8 mt-32 rounded-md">
      <h1 className="text-end text-3xl m-2">Editar Cliente</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <Input
            defaultValue={client.name}
            label="Nome"
            {...register("name")}
          />
        </div>
        <FormErrorMessage>
          {errors.name ? errors.name.message : null}
        </FormErrorMessage>
        <div>
          <Input
            defaultValue={client.email}
            label="Email"
            {...register("email")}
          />
        </div>
        <FormErrorMessage>
          {errors.email ? errors.email.message : null}
        </FormErrorMessage>
        <div>
          <Input
            defaultValue={client.contact}
            label="Telefone"
            {...register("contact")}
          />
        </div>
        <FormErrorMessage>
          {errors.contact ? errors.contact.message : null}
        </FormErrorMessage>

        <button
          type="button"
          onClick={() => handleDeleteClient(client.id)}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 mt-8 ml-8 float-right"
        >
          Deletar
        </button>
        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 mt-8 float-right">
          Editar
        </button>
      </form>
    </main>
  );
};

export default EditClient;
