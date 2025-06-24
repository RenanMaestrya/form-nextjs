"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    dataNascimento: z
      .string()
      .refine((date) => {
        const today = new Date();
        const birthDate = new Date(date);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      }, "Você deve ter pelo menos 18 anos")
      .optional(),
    aceitarTermos: z
      .boolean()
      .refine((val) => val === true, "Você deve aceitar os termos de uso"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

export default function FormularioZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Simular envio para API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Dados do formulário:", data);
    alert("Formulário enviado com sucesso!");
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Validação com Zod
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="nome-zod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome Completo
          </label>
          <input
            id="nome-zod"
            type="text"
            {...register("nome")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.nome ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "nome-zod-error" : undefined}
          />
          {errors.nome && (
            <p id="nome-zod-error" className="mt-1 text-sm text-red-600">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email-zod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            id="email-zod"
            type="email"
            {...register("email")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-zod-error" : undefined}
          />
          {errors.email && (
            <p id="email-zod-error" className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefone-zod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefone (opcional)
          </label>
          <input
            id="telefone-zod"
            type="tel"
            {...register("telefone")}
            placeholder="(99) 99999-9999"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.telefone ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.telefone}
            aria-describedby={
              errors.telefone ? "telefone-zod-error" : undefined
            }
          />
          {errors.telefone && (
            <p id="telefone-zod-error" className="mt-1 text-sm text-red-600">
              {errors.telefone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="data-nascimento"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Data de Nascimento (opcional)
          </label>
          <input
            id="data-nascimento"
            type="date"
            {...register("dataNascimento")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.dataNascimento ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.dataNascimento}
            aria-describedby={
              errors.dataNascimento ? "data-nascimento-error" : undefined
            }
          />
          {errors.dataNascimento && (
            <p id="data-nascimento-error" className="mt-1 text-sm text-red-600">
              {errors.dataNascimento.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="senha-zod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="senha-zod"
            type="password"
            {...register("senha")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.senha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.senha}
            aria-describedby={errors.senha ? "senha-zod-error" : undefined}
          />
          {errors.senha && (
            <p id="senha-zod-error" className="mt-1 text-sm text-red-600">
              {errors.senha.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmar-senha"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmar Senha
          </label>
          <input
            id="confirmar-senha"
            type="password"
            {...register("confirmarSenha")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.confirmarSenha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.confirmarSenha}
            aria-describedby={
              errors.confirmarSenha ? "confirmar-senha-error" : undefined
            }
          />
          {errors.confirmarSenha && (
            <p id="confirmar-senha-error" className="mt-1 text-sm text-red-600">
              {errors.confirmarSenha.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="aceitar-termos"
            type="checkbox"
            {...register("aceitarTermos")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            aria-invalid={!!errors.aceitarTermos}
            aria-describedby={
              errors.aceitarTermos ? "aceitar-termos-error" : undefined
            }
          />
          <label
            htmlFor="aceitar-termos"
            className="ml-2 block text-sm text-gray-700"
          >
            Aceito os termos de uso e política de privacidade
          </label>
        </div>
        {errors.aceitarTermos && (
          <p id="aceitar-termos-error" className="mt-1 text-sm text-red-600">
            {errors.aceitarTermos.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
