import React from "react";
import { FormElement } from "./FormElements";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function SidebarBtnElement({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `desinger-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 size-32 cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="text-primary cursor-grab size-12" />
      <p className="text-md font-semibold">{label}</p>
    </Button>
  );
}

export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-2 size-32 cursor-grab"
    >
      <Icon className="text-primary cursor-grab size-20" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
