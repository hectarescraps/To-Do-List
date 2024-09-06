import { sql } from "@vercel/postgres";

export async function fetchAllTasks() {
  try {
    const data = await sql`SELECT * FROM tasks ORDER BY duedate ASC;`;
    return data.rows;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Failed to fetch Task data");
  }
}

export async function fetchProjects() {
  try {
    const data = await sql`SELECT project FROM tasks GROUP BY project`;
    return data.rows;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Failed to fetch Project data");
  }
}
