import React from "react";
import { GetFormById, GetFormWithResponses } from "@/action/form";
import FormBuilder from "@/components/form-builder/FormBuilder";
import CopyLink from "@/components/form-response/CopyLink";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import FormData from "@/components/form-response/FormData";
import FormChart from "@/components/form-response/FormChart";
import {
  ElementsType,
  FormElementInstance,
} from "@/components/form-builder/FormElements";

export type ColumnType = {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
};
export type RowType = {
  id: string;
  submittedAt: string;
  [key: string]: string;
};

export default async function ResponsePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //   throw new Error("This page is not implemented yet");
  const form = await GetFormById((await params).id);
  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, responses } = form;

  let responseRate = 0;

  if (visits > 0) {
    responseRate = Math.round((responses / visits) * 100);
  }

  const { formName, formContent, formResponses } = await GetFormWithResponses(
    form.id
  );
  console.log("responses to display", formResponses);
  const formElements = JSON.parse(formContent) as FormElementInstance[];
  const rows: RowType[] = formResponses.map((res) => {
    const content = JSON.parse(res.content);
    return { id: res.id, submittedAt: res.createdAt, ...content };
  });
  const columns: ColumnType[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextareaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  return (
    <div className="flex flex-col h-full w-full px-8 border-b border-muted gap-6">
      <h1 className="text-4xl font-bold truncate">{form.name}</h1>
      <CopyLink shareURL={form.shareURL} />
      <div className="lg:w-1/2 w-full mx-auto flex lg:flex-row flex-col justify-between container font-bold text-lg">
        <p>Visits: {visits}</p>
        <p>Responses: {responses}</p>
        <p>Response Rate: {responseRate}%</p>
      </div>
      <Tabs
        defaultValue="data"
        className="w-full justify-center lg:items-center gap-4 flex-1"
      >
        <TabsList className="flex justify-center">
          <TabsTrigger className="lg:w-sm w-1/2" value="data">
            Raw Data
          </TabsTrigger>
          <TabsTrigger className="lg:w-sm w-1/2" value="chart">
            Insights
          </TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="w-full">
          <FormData formName={formName} rows={rows} columns={columns} />
        </TabsContent>
        <TabsContent value="chart" className="w-full flex justify-center">
          <FormChart formName={formName} rows={rows} columns={columns} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
