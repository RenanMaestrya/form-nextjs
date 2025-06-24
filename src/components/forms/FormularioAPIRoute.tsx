"use client";

import { useState } from "react";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone: string;
  aceitarTermos: boolean;
}

interface FormErrors {
  nome?: string[];
  email?: string[];
  senha?: string[];
  confirmarSenha?: string[];
  telefone?: string[];
  aceitarTermos?: string[];
}

export default function FormularioAPIRoute() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    aceitarTermos: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/formulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          alert(result.message || "Erro ao enviar formulário");
        }
        return;
      }

      alert(result.message);

      // Limpar formulário após sucesso
      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        telefone: "",
        aceitarTermos: false,
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro ao conectar com o servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">API Route</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome-api"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome Completo
          </label>
          <input
            id="nome-api"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.nome ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "nome-api-error" : undefined}
          />
          {errors.nome && (
            <p id="nome-api-error" className="mt-1 text-sm text-red-600">
              {errors.nome[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email-api"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            id="email-api"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-api-error" : undefined}
          />
          {errors.email && (
            <p id="email-api-error" className="mt-1 text-sm text-red-600">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefone-api"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefone (opcional)
          </label>
          <input
            id="telefone-api"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.telefone ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.telefone}
            aria-describedby={
              errors.telefone ? "telefone-api-error" : undefined
            }
          />
          {errors.telefone && (
            <p id="telefone-api-error" className="mt-1 text-sm text-red-600">
              {errors.telefone[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="senha-api"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="senha-api"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.senha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.senha}
            aria-describedby={errors.senha ? "senha-api-error" : undefined}
          />
          {errors.senha && (
            <p id="senha-api-error" className="mt-1 text-sm text-red-600">
              {errors.senha[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmar-senha-api"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmar Senha
          </label>
          <input
            id="confirmar-senha-api"
            name="confirmarSenha"
            type="password"
            value={formData.confirmarSenha}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              errors.confirmarSenha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.confirmarSenha}
            aria-describedby={
              errors.confirmarSenha ? "confirmar-senha-api-error" : undefined
            }
          />
          {errors.confirmarSenha && (
            <p
              id="confirmar-senha-api-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.confirmarSenha[0]}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="aceitar-termos-api"
            name="aceitarTermos"
            type="checkbox"
            checked={formData.aceitarTermos}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            aria-invalid={!!errors.aceitarTermos}
            aria-describedby={
              errors.aceitarTermos ? "aceitar-termos-api-error" : undefined
            }
          />
          <label
            htmlFor="aceitar-termos-api"
            className="ml-2 block text-sm text-gray-700"
          >
            Aceito os termos de uso e política de privacidade
          </label>
        </div>
        {errors.aceitarTermos && (
          <p
            id="aceitar-termos-api-error"
            className="mt-1 text-sm text-red-600"
          >
            {errors.aceitarTermos[0]}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
