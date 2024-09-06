"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

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
  success: boolean;
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
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create Task",
      success: false,
    };
  }

  const { title, subtitle, project, label, dueDate, priority } =
    validatedFields.data;

  const formattedDate = dueDate.slice(0, 28);

  try {
    await sql`INSERT INTO tasks (id, title, subtitle, project, label, duedate, priority) 
        VALUES (gen_random_uuid(), ${title}, ${subtitle}, ${project}, ${label}, ${formattedDate}, ${priority})`;
    return { errors: {}, message: "Task created successfully", success: true };
  } catch (error) {
    return {
      errors: {},
      message: "Database Error. Failed to create Task",
      success: false,
    };
  }
  // revalidatePath("/dashboard");
  // redirect("/dashboard");
}

export async function deleteTask({ id }: { id: string }) {
  try {
    sql`DELETE FROM ONLY tasks WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error. Failed to delete Task" };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createUser(prevState: string, formData: FormData) {
  const parsedFormData = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!parsedFormData.success) {
    console.log("Invalid credentials");
    return "Invalid credentials";
  }
  const { email, password } = parsedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;
    console.log("Created user!");
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user.");
  }
  try {
    await signIn("credentials", { redirect: false, email, password });
    return "User successfully signed up and signed in";
  } catch (error) {
    console.error("Failed to sign in user after sign up", error);
    throw new Error("Failed to sign in user after sign up");
  }
}
