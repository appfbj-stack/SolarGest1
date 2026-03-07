import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const clientes = await db.cliente.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(clientes);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cliente = await db.cliente.create({ data: body });
    return NextResponse.json(cliente, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar cliente" }, { status: 500 });
  }
}
