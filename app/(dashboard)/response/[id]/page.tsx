import React from "react";
import { GetFormById } from "@/action/form";
import FormBuilder from "@/components/form-builder/FormBuilder";
import CopyLink from "@/components/form-response/CopyLink";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import FormData from "@/components/form-response/FormData";
import FormChart from "@/components/form-response/FormChart";

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

  return (
    <div className="flex flex-col h-full w-full px-8 border-b border-muted gap-6">
      <h1 className="text-4xl font-bold truncate">{form.name}</h1>
      <CopyLink shareURL={form.shareURL} />
      <div className="lg:w-1/2 w-full mx-auto flex lg:flex-row flex-col justify-between container font-bold text-lg">
        <p>Visits: {visits}</p>
        <p>Responses: {responses}</p>
        <p>Response Rate: {responseRate}%</p>
      </div>
      <ResponsesTable id={form.id} />
    </div>
  );
}

function ResponsesTable({ id }: { id: number }) {
  return (
    <Tabs defaultValue="data" className="w-full lg:items-center gap-4">
      <TabsList className="flex justify-center">
        <TabsTrigger className="lg:w-sm w-1/2" value="data">
          Raw Data
        </TabsTrigger>
        <TabsTrigger className="lg:w-sm w-1/2" value="chart">
          Insights
        </TabsTrigger>
      </TabsList>
      <TabsContent value="data" className="w-full">
        <FormData id={id} />
      </TabsContent>
      <TabsContent value="chart" className="w-full">
        <FormChart id={id} />
      </TabsContent>
    </Tabs>
  );
}
