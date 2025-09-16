import { GetFormWithResponses } from "@/action/form";
import React from "react";
import {
  ElementsType,
  FormElementInstance,
} from "@/components/form-builder/FormElements";
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

export default async function FormData({ id }: { id: number }) {
  const { formName, formContent, responses } = await GetFormWithResponses(id);
  console.log("responses to display", responses);
  const formElements = JSON.parse(formContent) as FormElementInstance[];
  const rows: RowType[] = responses.map((res) => {
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
