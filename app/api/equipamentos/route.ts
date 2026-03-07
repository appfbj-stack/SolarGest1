import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const equipamentos = await db.equipamento.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(equipamentos);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar equipamentos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const equipamento = await db.equipamento.create({ data: body });
    return NextResponse.json(equipamento, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar equipamento" }, { status: 500 });
  }
}
