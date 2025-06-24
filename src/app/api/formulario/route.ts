import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const resultado = schema.safeParse(data);

    if (!resultado.success) {
      return NextResponse.json(
        {
          success: false,
          errors: resultado.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Simular processamento no servidor
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Dados processados via API Route:", resultado.data);

    return NextResponse.json(
      {
        success: true,
        message: "Formulário processado com sucesso!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar formulário:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Método GET não permitido" },
    { status: 405 }
  );
}
