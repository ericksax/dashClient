import { z } from "zod";

export const registrySchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(4),
    confirmPassword: z.string().min(4).min(1),
    phone: z.string().max(20).min(1),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais",
        path: ["confirmPassword"],
      });
    }
  });

export const requestFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(4).min(1),
  telefone: z.string().max(20).min(1),
});

export type RegistryFormValuesProps = z.infer<typeof registrySchema>;
export type RequestFormValues = z.infer<typeof requestFormSchema>;
