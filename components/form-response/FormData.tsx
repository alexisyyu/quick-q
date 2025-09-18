import React from "react";
import { ElementsType } from "@/components/form-builder/FormElements";
import {
  Table,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import DownloadDataBtn from "./DownloadDataBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnType, RowType } from "@/app/(dashboard)/response/[id]/page";

export default async function FormData({
  formName,
  rows,
  columns,
}: {
  formName: string;
  rows: RowType[];
  columns: ColumnType[];
}) {
  return (
    <div className="flex flex-col h-full gap-4">
      <DownloadDataBtn formName={formName} rows={rows} columns={columns} />
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.id}>{col.label}</TableHead>
            ))}
            <TableHead key={"submittedAt"} className="text-right">
              Submitted At
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <RowCell
                  key={row.id + col.id}
                  type={col.type}
                  value={row[col.id]}
                ></RowCell>
              ))}
              <TableCell key={row.id + "submittedAt"} className="text-right">
                {formatDistance(new Date(row.submittedAt), new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;
  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox disabled checked={checked} />;
      break;
  }
  return <TableCell>{node}</TableCell>;
}

export function convertToCSV(rows: RowType[], columns: ColumnType[]) {
  const header = columns
    .map((col) => col.label)
    .concat("Submitted At")
    .join(",");
  const csvRows = rows.map((row) => {
    const values = columns.map((col) => `"${row[col.id] ?? ""}"`);
    values.push(`"${row.submittedAt}"`);
    return values.join(",");
  });
  return [header, ...csvRows].join("\r\n");
}
