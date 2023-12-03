"use client";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { configObjectToasty } from "@/constantes";
import { FormValuesProps, loginSchema } from "./zodLoginSchema";
import FormErrorMessage from "@/components/formMessageError";
import Input from "@/components/inputs";

const Login = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (formData: FieldValues) => {
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
          push("/dash");
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
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="w-full flex items-center justify-center p-24">
        <strong className="text-4xl">
          Dash<span className="text-gray-400">Client</span>{" "}
        </strong>
      </header>
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md flex flex-col">
        <h2 className="text-2xl font-semibold mb-4 self-end">Login</h2>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <Input label="E-mail" {...register("email")} />
            <FormErrorMessage>
              {errors.email ? errors.email.message : ""}
            </FormErrorMessage>
          </div>
          <div className="mb-4">
            <Input type="password" label="Senha" {...register("password")} />
            <FormErrorMessage>
              {errors.password ? errors.password.message : ""}
            </FormErrorMessage>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
          >
            {isSubmitting ? <ClipLoader size={16} color="white" /> : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-gray-400 block">
          Não tem uma conta?{" "}
          <a
            href="/registry"
            className="text-gray-50 hover:text-gray-300 hover:underline float-right"
          >
            Crie uma aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
