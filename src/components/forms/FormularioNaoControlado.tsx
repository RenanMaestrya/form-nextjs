"use client";

import { useRef, useState } from "react";

export default function FormularioNaoControlado() {
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const [erros, setErros] = useState<{ email?: string; senha?: string }>({});

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarSenha = (senha: string) => {
    return senha.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const senha = senhaRef.current?.value || "";

    const novosErros: { email?: string; senha?: string } = {};

    if (!email) {
      novosErros.email = "E-mail é obrigatório";
    } else if (!validarEmail(email)) {
      novosErros.email = "E-mail inválido";
    }

    if (!senha) {
      novosErros.senha = "Senha é obrigatória";
    } else if (!validarSenha(senha)) {
      novosErros.senha = "Senha deve ter pelo menos 8 caracteres";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      console.log("Dados do formulário:", { email, senha });
      alert("Formulário enviado com sucesso!");

      // Limpar os campos após envio bem-sucedido
      if (emailRef.current) emailRef.current.value = "";
      if (senhaRef.current) senhaRef.current.value = "";
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Formulário Não Controlado
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email-uncontrolled"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            id="email-uncontrolled"
            ref={emailRef}
            type="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              erros.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!erros.email}
            aria-describedby={
              erros.email ? "email-uncontrolled-error" : undefined
            }
          />
          {erros.email && (
            <p
              id="email-uncontrolled-error"
              className="mt-1 text-sm text-red-600"
            >
              {erros.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="senha-uncontrolled"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="senha-uncontrolled"
            ref={senhaRef}
            type="password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              erros.senha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!erros.senha}
            aria-describedby={
              erros.senha ? "senha-uncontrolled-error" : undefined
            }
          />
          {erros.senha && (
            <p
              id="senha-uncontrolled-error"
              className="mt-1 text-sm text-red-600"
            >
              {erros.senha}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
