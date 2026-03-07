import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const tarefa = await db.tarefa.update({ where: { id }, data: body });
    return NextResponse.json(tarefa);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar tarefa" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.tarefa.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar tarefa" }, { status: 500 });
  }
}
