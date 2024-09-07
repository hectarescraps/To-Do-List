"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { auth } from "@/auth";
import dayjs from "dayjs";

const FormSchema = z.object({
  id: z.string(),
  email: z.string(),
  title: z.string({
    invalid_type_error: "Please enter a Task Title.",
  }),
  project: z.string({
    invalid_type_error: "Please enter a Project.",
  }),
  dueDate: z.string({
    invalid_type_error: "Please enter a valid Date.",
  }),
  priority: z.coerce.number().gt(0, {
    message: "Please enter a Priority",
  }),
});

const CreateTask = FormSchema.omit({ id: true, email: true });

export type State = {
  errors?: {
    title?: string[];
    project?: string[];
    dueDate?: string[];
    priority?: string[];
  };
  message: string | null;
  success: boolean;
};

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    title: formData.get("title"),
    project: formData.get("project"),
    dueDate: formData.get("dueDate"),
    priority: formData.get("priority"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Please fix all errors and try again!",
      success: false,
    };
  }

  const { title, project, dueDate, priority } = validatedFields.data;

  // formats dueDate to remove written timezone e.g. [America/Los_Angeles]
  var formattedDate = dueDate.slice(0, 29);
  // formats dueDate to just include the date
  formattedDate = dayjs(formattedDate).format("YYYY-MM-DD");

  // get email from auth session var
  const session = await auth();
  const email = session?.user?.email;

  try {
    await sql`INSERT INTO tasks (id, email, title, project, duedate, priority) 
        VALUES (gen_random_uuid(), ${email}, ${title}, ${project}, ${formattedDate}, ${priority})`;
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
    return "User successfully signed in";
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

export async function createUser(
  prevState: string | undefined,
  formData: FormData
) {
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
    console.log("User created successfully!");
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
