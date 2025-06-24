"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  nome: Yup.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: Yup.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    )
    .required("Senha é obrigatória"),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha")], "Senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  telefone: Yup.string()
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Telefone deve estar no formato (99) 99999-9999"
    )
    .optional(),
  aceitarTermos: Yup.boolean()
    .oneOf([true], "Você deve aceitar os termos de uso")
    .required("Você deve aceitar os termos de uso"),
});

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone: string;
  aceitarTermos: boolean;
}

const initialValues: FormData = {
  nome: "",
  email: "",
  senha: "",
  confirmarSenha: "",
  telefone: "",
  aceitarTermos: false,
};

export default function FormularioFormik() {
  const handleSubmit = async (
    values: FormData,
    { setSubmitting, resetForm }: FormikHelpers<FormData>
  ) => {
    try {
      // Simular envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Dados do formulário:", values);
      alert("Formulário enviado com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Formulário com Formik
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="nome-formik"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome Completo
              </label>
              <Field
                id="nome-formik"
                name="nome"
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.nome && touched.nome
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!(errors.nome && touched.nome)}
                aria-describedby={
                  errors.nome && touched.nome ? "nome-formik-error" : undefined
                }
              />
              <ErrorMessage
                name="nome"
                component="p"
                id="nome-formik-error"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="email-formik"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <Field
                id="email-formik"
                name="email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!(errors.email && touched.email)}
                aria-describedby={
                  errors.email && touched.email
                    ? "email-formik-error"
                    : undefined
                }
              />
              <ErrorMessage
                name="email"
                component="p"
                id="email-formik-error"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="telefone-formik"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefone (opcional)
              </label>
              <Field
                id="telefone-formik"
                name="telefone"
                type="tel"
                placeholder="(99) 99999-9999"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.telefone && touched.telefone
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!(errors.telefone && touched.telefone)}
                aria-describedby={
                  errors.telefone && touched.telefone
                    ? "telefone-formik-error"
                    : undefined
                }
              />
              <ErrorMessage
                name="telefone"
                component="p"
                id="telefone-formik-error"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="senha-formik"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <Field
                id="senha-formik"
                name="senha"
                type="password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.senha && touched.senha
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!(errors.senha && touched.senha)}
                aria-describedby={
                  errors.senha && touched.senha
                    ? "senha-formik-error"
                    : undefined
                }
              />
              <ErrorMessage
                name="senha"
                component="p"
                id="senha-formik-error"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="confirmar-senha-formik"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar Senha
              </label>
              <Field
                id="confirmar-senha-formik"
                name="confirmarSenha"
                type="password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.confirmarSenha && touched.confirmarSenha
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={
                  !!(errors.confirmarSenha && touched.confirmarSenha)
                }
                aria-describedby={
                  errors.confirmarSenha && touched.confirmarSenha
                    ? "confirmar-senha-formik-error"
                    : undefined
                }
              />
              <ErrorMessage
                name="confirmarSenha"
                component="p"
                id="confirmar-senha-formik-error"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="flex items-center">
              <Field
                id="aceitar-termos-formik"
                name="aceitarTermos"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                aria-invalid={!!(errors.aceitarTermos && touched.aceitarTermos)}
                aria-describedby={
                  errors.aceitarTermos && touched.aceitarTermos
                    ? "aceitar-termos-formik-error"
                    : undefined
                }
              />
              <label
                htmlFor="aceitar-termos-formik"
                className="ml-2 block text-sm text-gray-700"
              >
                Aceito os termos de uso e política de privacidade
              </label>
            </div>
            <ErrorMessage
              name="aceitarTermos"
              component="p"
              id="aceitar-termos-formik-error"
              className="mt-1 text-sm text-red-600"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
