"use client";

import { submitForm } from "@/app/actions";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

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

const initialState: State = {
  success: false,
  message: "",
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Enviando..." : "Enviar"}
    </button>
  );
}

export default function FormularioServerAction() {
  const [state, formAction] = useActionState(submitForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      alert(state.message);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Server Actions</h2>
      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="nome-server"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome Completo
          </label>
          <input
            id="nome-server"
            name="nome"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              state.errors?.nome ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!state.errors?.nome}
            aria-describedby={
              state.errors?.nome ? "nome-server-error" : undefined
            }
          />
          {state.errors?.nome && (
            <p id="nome-server-error" className="mt-1 text-sm text-red-600">
              {state.errors.nome[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email-server"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            id="email-server"
            name="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              state.errors?.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!state.errors?.email}
            aria-describedby={
              state.errors?.email ? "email-server-error" : undefined
            }
          />
          {state.errors?.email && (
            <p id="email-server-error" className="mt-1 text-sm text-red-600">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefone-server"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefone (opcional)
          </label>
          <input
            id="telefone-server"
            name="telefone"
            type="tel"
            placeholder="(99) 99999-9999"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              state.errors?.telefone ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!state.errors?.telefone}
            aria-describedby={
              state.errors?.telefone ? "telefone-server-error" : undefined
            }
          />
          {state.errors?.telefone && (
            <p id="telefone-server-error" className="mt-1 text-sm text-red-600">
              {state.errors.telefone[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="senha-server"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="senha-server"
            name="senha"
            type="password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              state.errors?.senha ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!state.errors?.senha}
            aria-describedby={
              state.errors?.senha ? "senha-server-error" : undefined
            }
          />
          {state.errors?.senha && (
            <p id="senha-server-error" className="mt-1 text-sm text-red-600">
              {state.errors.senha[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmar-senha-server"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmar Senha
          </label>
          <input
            id="confirmar-senha-server"
            name="confirmarSenha"
            type="password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
              state.errors?.confirmarSenha
                ? "border-red-500"
                : "border-gray-300"
            }`}
            aria-invalid={!!state.errors?.confirmarSenha}
            aria-describedby={
              state.errors?.confirmarSenha
                ? "confirmar-senha-server-error"
                : undefined
            }
          />
          {state.errors?.confirmarSenha && (
            <p
              id="confirmar-senha-server-error"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.confirmarSenha[0]}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="aceitar-termos-server"
            name="aceitarTermos"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            aria-invalid={!!state.errors?.aceitarTermos}
            aria-describedby={
              state.errors?.aceitarTermos
                ? "aceitar-termos-server-error"
                : undefined
            }
          />
          <label
            htmlFor="aceitar-termos-server"
            className="ml-2 block text-sm text-gray-700"
          >
            Aceito os termos de uso e política de privacidade
          </label>
        </div>
        {state.errors?.aceitarTermos && (
          <p
            id="aceitar-termos-server-error"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.aceitarTermos[0]}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
