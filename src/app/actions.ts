"use server";

import { z } from "zod";

const schema = z
  .object({
    nome: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
    senha: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
      ),
    confirmarSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
    telefone: z
      .string()
      .regex(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        "Telefone deve estar no formato (99) 99999-9999"
      )
      .optional(),
    aceitarTermos: z
      .boolean()
      .refine((val) => val === true, "Você deve aceitar os termos de uso"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormErrors = {
  nome?: string[];
  email?: string[];
  senha?: string[];
  confirmarSenha?: string[];
  telefone?: string[];
  aceitarTermos?: string[];
};

type State = {
  success: boolean;
  message: string;
  errors: FormErrors;
};

export async function submitForm(
  prevState: State,
  formData: FormData
): Promise<State> {
  const dados = {
    nome: formData.get("nome") as string,
    email: formData.get("email") as string,
    senha: formData.get("senha") as string,
    confirmarSenha: formData.get("confirmarSenha") as string,
    telefone: formData.get("telefone") as string,
    aceitarTermos: formData.get("aceitarTermos") === "on",
  };

  const resultado = schema.safeParse(dados);

  if (!resultado.success) {
    return {
      success: false,
      message: "",
      errors: resultado.error.flatten().fieldErrors,
    };
  }

  // Simular processamento no servidor
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Dados processados no servidor:", resultado.data);

  return {
    success: true,
    message: "Formulário processado com sucesso!",
    errors: {},
  };
}
