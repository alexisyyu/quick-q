import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import useDesigner from "@/components/hooks/useDesigner";
import PropertiesSidebar from "./PropertiesSidebar";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

export default function DesignerSidebar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className="w-[180px] md:w-[300px] flex flex-col gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full rounded-xl">
      {selectedElement ? (
        <PropertiesSidebar />
      ) : (
        <div>
          <p className="text-sm text-foreground/70">
            Drag and drop elements onto the left panel
          </p>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 place-items-center">
            <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 place-self-start">
              Layout Elements
            </p>
            <SidebarBtnElement formElement={FormElements.TitleField} />
            <SidebarBtnElement formElement={FormElements.SubTitleField} />
            <SidebarBtnElement formElement={FormElements.ParagraphField} />
            <SidebarBtnElement formElement={FormElements.SeparatorField} />
            <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 place-self-start">
              Question Elements
            </p>
            <SidebarBtnElement formElement={FormElements.TextField} />
            <SidebarBtnElement formElement={FormElements.NumberField} />
            <SidebarBtnElement formElement={FormElements.TextareaField} />
            <SidebarBtnElement formElement={FormElements.DateField} />
            <SidebarBtnElement formElement={FormElements.SelectField} />
            <SidebarBtnElement formElement={FormElements.CheckboxField} />
          </div>
        </div>
      )}
    </aside>
  );
}
