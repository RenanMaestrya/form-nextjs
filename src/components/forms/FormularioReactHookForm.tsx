"use client";

import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  senha: string;
  nome: string;
  telefone: string;
}

export default function FormularioReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simular envio para API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Dados do formulário:", data);
    alert("Formulário enviado com sucesso!");
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome
          </label>
          <input
            id="nome"
            type="text"
            {...register("nome", {
              required: "Nome é obrigatório",
              minLength: {
                value: 2,
                message: "Nome deve ter pelo menos 2 caracteres",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.nome ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "nome-error" : undefined}
          />
          {errors.nome && (
            <p id="nome-error" className="mt-1 text-sm text-red-600">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email-rhf"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            id="email-rhf"
            type="email"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "E-mail inválido",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-rhf-error" : undefined}
          />
          {errors.email && (
            <p id="email-rhf-error" className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            {...register("telefone", {
              pattern: {
                value: /^\(\d{2}\) \d{5}-\d{4}$/,
                message: "Telefone deve estar no formato (99) 99999-9999",
              },
            })}
            placeholder="(99) 99999-9999"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.telefone ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.telefone}
            aria-describedby={errors.telefone ? "telefone-error" : undefined}
          />
          {errors.telefone && (
            <p id="telefone-error" className="mt-1 text-sm text-red-600">
              {errors.telefone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="senha-rhf"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="senha-rhf"
            type="password"
            {...register("senha", {
              required: "Senha é obrigatória",
              minLength: {
                value: 8,
                message: "Senha deve ter pelo menos 8 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.senha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.senha}
            aria-describedby={errors.senha ? "senha-rhf-error" : undefined}
          />
          {errors.senha && (
            <p id="senha-rhf-error" className="mt-1 text-sm text-red-600">
              {errors.senha.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
