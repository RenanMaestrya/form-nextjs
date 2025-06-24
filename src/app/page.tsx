"use client";

import { ComponentType, useState } from "react";

const formularios = [
  {
    nome: "Formulário Controlado",
    componente: () =>
      import("@/components/forms/FormularioControlado").then((m) => m.default),
  },
  {
    nome: "Formulário Não Controlado",
    componente: () =>
      import("@/components/forms/FormularioNaoControlado").then(
        (m) => m.default
      ),
  },
  {
    nome: "React Hook Form",
    componente: () =>
      import("@/components/forms/FormularioReactHookForm").then(
        (m) => m.default
      ),
  },
  {
    nome: "React Hook Form + Zod",
    componente: () =>
      import("@/components/forms/FormularioZod").then((m) => m.default),
  },
  {
    nome: "Formik + Yup",
    componente: () =>
      import("@/components/forms/FormularioFormik").then((m) => m.default),
  },
  {
    nome: "API Route",
    componente: () =>
      import("@/components/forms/FormularioAPIRoute").then((m) => m.default),
  },
  {
    nome: "Server Actions",
    componente: () =>
      import("@/components/forms/FormularioServerAction").then(
        (m) => m.default
      ),
  },
];

export default function Home() {
  const [formIndex, setFormIndex] = useState<number | null>(null);
  const [Componente, setComponente] = useState<ComponentType | null>(null);

  const handleSelect = async (idx: number) => {
    setFormIndex(idx);
    const mod = await formularios[idx].componente();
    setComponente(() => mod);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
          Exemplos de Formulários Next.js
        </h1>
        <nav className="flex flex-wrap gap-2 justify-center mb-8">
          {formularios.map((f, idx) => (
            <button
              key={f.nome}
              onClick={() => handleSelect(idx)}
              className={`px-4 py-2 rounded-md border font-medium transition-colors ${
                formIndex === idx
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-blue-900 border-blue-300 hover:bg-blue-100"
              }`}
            >
              {f.nome}
            </button>
          ))}
        </nav>
        <div className="mt-6">
          {Componente ? (
            <Componente />
          ) : (
            <p className="text-center text-gray-500">
              Selecione um exemplo acima para visualizar o formulário.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
