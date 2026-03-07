import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const eventos = await db.agenda.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(eventos);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar eventos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const evento = await db.agenda.create({ data: body });
    return NextResponse.json(evento, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar evento" }, { status: 500 });
  }
}
