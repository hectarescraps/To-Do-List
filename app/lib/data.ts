import { sql } from "@vercel/postgres";
import { auth } from "@/auth";

export async function fetchAllTasks() {
  const session = await auth();
  const email = session?.user?.email;

  try {
    const data =
      await sql`SELECT * FROM tasks WHERE email = ${email} ORDER BY duedate ASC, priority ASC;`;
    return data.rows;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Failed to fetch Task data");
  }
}

export async function fetchProjects() {
  const session = await auth();
  const email = session?.user?.email;

  try {
    const data =
      await sql`SELECT project FROM tasks WHERE email = ${email} GROUP BY project ORDER BY project ASC;`;
    return data.rows;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Failed to fetch Project data");
  }
}
