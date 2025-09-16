import React from "react";
import { GetFormById } from "@/action/form";
import FormBuilder from "@/components/form-builder/FormBuilder";

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //   throw new Error("This page is not implemented yet");
  const form = await GetFormById((await params).id);
  return <FormBuilder form={form} />;
}
