import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const transacoes = await db.financeiro.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(transacoes);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar transações" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transacao = await db.financeiro.create({
      data: {
        descricao: body.description,
        tipo: body.type,
        valor: body.amount,
        categoria: body.category,
        status: body.status,
        data: body.data ? new Date(body.data) : new Date(),
      },
    });
    return NextResponse.json(transacao, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar transação" }, { status: 500 });
  }
}
