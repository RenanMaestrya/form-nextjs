"use client";

import { useState } from "react";

export default function FormularioControlado() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Formulário Controlado
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              erros.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!erros.email}
            aria-describedby={erros.email ? "email-error" : undefined}
          />
          {erros.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {erros.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              erros.senha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!erros.senha}
            aria-describedby={erros.senha ? "senha-error" : undefined}
          />
          {erros.senha && (
            <p id="senha-error" className="mt-1 text-sm text-red-600">
              {erros.senha}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
