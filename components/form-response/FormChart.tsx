"use client";
import React from "react";
import { RowType, ColumnType } from "@/app/(dashboard)/response/[id]/page";
import { convertToCSV } from "./FormData";
import { generateInsight } from "@/action/ai";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FormChart({
  formName,
  rows,
  columns,
}: {
  formName: string;
  rows: RowType[];
  columns: ColumnType[];
}) {
  const [insights, setInsights] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchInsights() {
      const csvContent = convertToCSV(rows, columns);
      console.log("csvContent", csvContent);
      const response = await generateInsight(formName, csvContent);
      const insights = JSON.parse(response ?? "[]") as string[];
      console.log("insights", insights);
      setInsights(insights);
    }
    fetchInsights();
  }, [formName, rows, columns]);

  return (
    <Card className="w-full max-w-sm justify-between lg:max-h-2/3 lg:my-8">
      <CardHeader>
        <CardTitle>
          Insights {insights.length > 0 && `${index + 1} / ${insights.length}`}
        </CardTitle>
        <CardDescription>
          Here are some insights based on the responses:
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insights.length === 0
          ? "We are generating insights for you. Please wait..."
          : insights[index]}
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          onClick={() => setIndex((index - 1) % insights.length)}
          className="rounded-full w-10 h-10 flex justify-center items-center"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => setIndex((index + 1) % insights.length)}
          className="rounded-full w-10 h-10 flex justify-center items-center"
        >
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
