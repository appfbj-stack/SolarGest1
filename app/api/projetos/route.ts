import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const projetos = await db.projeto.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(projetos);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar projetos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projeto = await db.projeto.create({ data: body });
    return NextResponse.json(projeto, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar projeto" }, { status: 500 });
  }
}
