"use server";

import { auth } from "@clerk/nextjs/server";
import { formSchema, formSchemaType } from "@/schemas/form";
import { db } from "@/db/db";
import { formResponses, forms } from "@/db/schema";
import { sql, and, eq, desc } from "drizzle-orm";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function GetFormStats() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
}

export async function CreateForm(data: formSchemaType) {
  // await sleep(1000);
  const { userId } = await auth();
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Invalid form data: " + validation.error.message);
  }
  if (!userId) {
    throw new Error("User not found");
  }

  try {
    const [form] = await db
      .insert(forms)
      .values({
        name: data.name,
        description: data.description ?? "",
        userId: userId,
        content: data.content ?? "[]",
      })
      .returning();

    return form.id;
  } catch (error) {
    console.error("Error creating form:", error);
    throw new Error("Failed to create form");
  }
}

export async function GetForms() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  return await db
    .select()
    .from(forms)
    .where(eq(forms.userId, userId))
    .orderBy(desc(forms.createdAt));
}

export async function GetFormById(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  return db
    .select()
    .from(forms)
    .where(and(eq(forms.id, Number(id)), eq(forms.userId, userId)))
    .limit(1)
    .then(([form]) => {
      if (!form) {
        throw new Error("Form not found");
      }
      return form;
    });
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  return await db
    .update(forms)
    .set({ content: jsonContent })
    .where(and(eq(forms.id, id), eq(forms.userId, userId)));
}

export async function PublishForm(id: number) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  return await db
    .update(forms)
    .set({ published: true })
    .where(and(eq(forms.id, id), eq(forms.userId, userId)));
}

export async function GetFormContentByUrl(formUrl: string) {
  return await db
    .update(forms)
    .set({ visits: sql`${forms.visits} + 1` })
    .where(eq(forms.shareURL, formUrl))
    .returning()
    .then(([form]) => {
      if (!form) {
        throw new Error("Form not found");
      }
      return form;
    });
}

export async function SubmitForm(
  formUrl: string,
  content: string,
  userId?: string
) {
  const formId = await db
    .update(forms)
    .set({ responses: sql`${forms.responses} + 1` })
    .where(and(eq(forms.shareURL, formUrl), eq(forms.published, true)))
    .returning()
    .then(([form]) => {
      if (!form) {
        throw new Error("Form not found");
      }
      return form.id;
    });

  console.log("formId", formId, "content", content);

  return await db
    .insert(formResponses)
    .values({
      formId: formId,
      content: content,
      userId: userId ?? "",
      createdAt: new Date(),
    })
    .returning()
    .then(([response]) => {
      if (!response) {
        throw new Error("Failed to submit form");
      }
      return response;
    });
}

export async function GetFormWithResponses(id: number) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  try {
    const [form] = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, id), eq(forms.userId, userId)));
    const responses = await db
      .select()
      .from(formResponses)
      .where(eq(formResponses.formId, form.id));
    return {
      formName: form.name,
      formContent: form.content,
      formResponses: responses,
    };
  } catch (error) {
    console.error("Error fetching form with responses:", error);
    throw new Error("Failed to fetch form with responses");
  }
}
