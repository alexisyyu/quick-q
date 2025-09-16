import React from "react";
import { GetFormContentByUrl } from "@/action/form";
import { FormElementInstance } from "@/components/form-builder/FormElements";
import FormSubmitComponent from "@/components/form-submit/FormSubmitComponent";

export default async function SubmitPage({
  params,
}: {
  params: Promise<{ formUrl: string }>;
}) {
  const { formUrl } = await params;
  const form = await GetFormContentByUrl(formUrl);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={formUrl} content={formContent} />;
}
