import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const ordens = await db.ordemServico.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(ordens);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar ordens de serviço" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const numero = `OS-${Date.now().toString().slice(-6)}`;
    const ordem = await db.ordemServico.create({ data: { ...body, numero } });
    return NextResponse.json(ordem, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar ordem de serviço" }, { status: 500 });
  }
}
