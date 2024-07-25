"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: "Please enter a Task Title.",
  }),
  subtitle: z.string({
    invalid_type_error: "Please enter a Task Subtitle.",
  }),
  project: z.string({
    invalid_type_error: "Please enter a Project.",
  }),
  label: z.string({
    invalid_type_error: "Please enter a Label.",
  }),
  dueDate: z.string({
    invalid_type_error: "Please enter a valid Date.",
  }),

  priority: z.coerce.number().gt(0, {
    message: "Please enter a Priority",
  }),
});

const CreateTask = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    subtitle?: string[];
    project?: string[];
    label?: string[];
    dueDate?: string[];
    priority?: string[];
  };
  message: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    project: formData.get("project"),
    label: formData.get("label"),
    dueDate: formData.get("dueDate"),
    priority: formData.get("priority"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create Task",
    };
  }

  const { title, subtitle, project, label, dueDate, priority } =
    validatedFields.data;

  try {
    sql`INSERT INTO tasks (title, subtitle, project, label, dueDate, priority) 
        VALUES (${title}, ${subtitle}, ${project}, ${label}, ${dueDate}, ${priority})`;
  } catch (error) {
    return { message: "Database Error. Failed to create Task" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
