import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE tasks ( id UUID, title VARCHAR(255), subtitle VARCHAR(255), project VARCHAR(255), label VARCHAR(255), duedate TIMESTAMP (0) WITH TIME ZONE, priority INTEGER);`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
