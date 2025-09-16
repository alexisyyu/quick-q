import React from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import useDesigner from "../hooks/useDesigner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

export default function PropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) {
    return null;
  }
  const Properties = FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-4" />
      <Properties elementInstance={selectedElement} />
    </div>
  );
}
