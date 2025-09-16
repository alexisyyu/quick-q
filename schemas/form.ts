import z from "zod";
import { InferSelectModel } from "drizzle-orm";
import { forms } from "@/db/schema";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  content: z.string().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;

export type Form = InferSelectModel<typeof forms>;
