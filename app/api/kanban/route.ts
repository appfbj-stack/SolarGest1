import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const tarefas = await db.tarefa.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(tarefas);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar tarefas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tarefa = await db.tarefa.create({ data: body });
    return NextResponse.json(tarefa, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar tarefa" }, { status: 500 });
  }
}
