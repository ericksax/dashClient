"use client";
import Input from "@/components/inputs";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistryFormValuesProps, registrySchema } from "./registry.schema";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import FormErrorMessage from "@/components/formMessageError";
import { useRouter } from "next/navigation";

const Registry = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistryFormValuesProps>({
    resolver: zodResolver(registrySchema),
  });

  const submit = async (formData: FieldValues) => {
    formData = {
      ...formData,
      contact: formData.phone,
    };
    const { confirmPassword, phone, ...requestValues } = formData;

    try {
      await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestValues),
      }).then((data) => {
        console.log(data.status);
        if (data.status === 201) {
          toast.success("Usuário criado com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    reset({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    push("/");
  };

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-95px)]">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-gray-800 p-8 rounded-md w-full max-w-md flex flex-col"
      >
        <h1 className="text-2xl self-end text-white font-semibold mb-4">
          Cadastre
        </h1>
        <div className="mb-4">
          <Input label="Nome" {...register("name")} />
          <FormErrorMessage>
            {errors.name ? errors.name.message : ""}
          </FormErrorMessage>
        </div>
        <div className="mb-4">
          <Input label="E-mail" {...register("email")} />
          <FormErrorMessage>
            {errors.email ? errors.email.message : ""}
          </FormErrorMessage>
        </div>
        <div>
          <Input label="Telefone" {...register("phone")} />
          <FormErrorMessage>
            {errors.phone ? errors.phone.message : ""}
          </FormErrorMessage>
        </div>
        <div className="mb-4">
          <Input label="Password" {...register("password")} />
          <FormErrorMessage>
            {errors.password ? errors.password.message : ""}
          </FormErrorMessage>
        </div>
        <div className="mb-4">
          <Input label="Confirm Password" {...register("confirmPassword")} />
          <FormErrorMessage>
            {errors.confirmPassword ? errors.confirmPassword.message : ""}
          </FormErrorMessage>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
        >
          {isSubmitting ? <PulseLoader color="white" /> : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default Registry;
