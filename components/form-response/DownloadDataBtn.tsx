"use client";
import React from "react";
import { RowType, ColumnType } from "./FormData";
import { Button } from "@/components/ui/button";

export default function DownloadDataBtn({
  formName,
  rows,
  columns,
}: {
  formName: string;
  rows: RowType[];
  columns: ColumnType[];
}) {
  function downloadTableAsCSV(
    rows: RowType[],
    columns: ColumnType[],
    filename = `${formName}_data.csv`
  ) {
    const header = columns
      .map((col) => col.label)
      .concat("Submitted At")
      .join(",");
    const csvRows = rows.map((row) => {
      const values = columns.map((col) => `"${row[col.id] ?? ""}"`);
      values.push(`"${row.submittedAt}"`);
      return values.join(",");
    });
    const csvContent = [header, ...csvRows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      className="mr-auto"
      variant="default"
      onClick={() => downloadTableAsCSV(rows, columns)}
    >
      Download Raw Data
    </Button>
  );
}
