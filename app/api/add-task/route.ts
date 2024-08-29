/* import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { tasks } from "@/app/lib/placeholder-data";

export async function GET(request: Request) {
  try {
    await Promise.all(
      tasks.map(
        async (task) =>
          sql`INSERT INTO tasks (id, title, subtitle, project, label, duedate, priority) VALUES (${task.id}, ${task.title}, ${task.subtitle}, ${task.project}, ${task.label}, ${task.duedate}, ${task.priority});`
      )
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const table = await sql`SELECT * FROM tasks;`;
  return NextResponse.json({ table }, { status: 200 });
}
 */
