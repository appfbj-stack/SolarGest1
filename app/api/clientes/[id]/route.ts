import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const cliente = await db.cliente.update({ where: { id }, data: body });
    return NextResponse.json(cliente);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar cliente" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.cliente.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar cliente" }, { status: 500 });
  }
}
