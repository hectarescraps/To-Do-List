import { sql } from "@vercel/postgres";

export async function fetchTasks() {
  try {
    const data = await sql`SELECT * FROM tasks;`;
    console.log(data);
    return data.rows;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Failed to fetch Task data");
  }
}
