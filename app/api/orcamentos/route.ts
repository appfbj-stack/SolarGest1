import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const orcamentos = await db.orcamento.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(orcamentos);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar orçamentos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const numero = `ORC-${Date.now().toString().slice(-6)}`;
    const orcamento = await db.orcamento.create({ data: { ...body, numero } });
    return NextResponse.json(orcamento, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar orçamento" }, { status: 500 });
  }
}
