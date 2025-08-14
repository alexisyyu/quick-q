"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const scheme = z.object({
  description: z.string().min(1, "Description is required"),
});

export async function generateForm(
  prevState: { message: string; data?: JSON },
  formData: FormData
) {
  const parse = scheme.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.error("Validation failed:", parse.error);
    return {
      message: "Validation failed",
    };
  }

  if (!process.env.AZURE_OPENAI_API_KEY || !process.env.AZURE_OPENAI_ENDPOINT) {
    console.error("Azure OpenAI configuration is not complete");
    return {
      message: "Azure OpenAI configuration is not complete",
    };
  }

  const data = parse.data;
  const prompt =
    "Based on the description, generate a questionnaire with questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup,l and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}l and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []. Your response should be able to be parsed by JSON.parse() without any errors. The response should not contain any additional text or explanations, just the JSON object.";

  try {
    const response = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AZURE_OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `${data.description} ${prompt}`,
            },
          ],
        }),
      }
    );

    const result = await response.json();

    revalidatePath("/");

    return {
      message: "success",
      data: result,
    };
  } catch (error) {
    console.error("Error generating form:", error);
    return {
      message: "Error generating form",
    };
  }
}
