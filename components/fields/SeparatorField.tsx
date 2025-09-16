import {
  ElementsType,
  FormElement,
  FormElementInstance,
  designerComponentType,
  FormComponentType,
  PropertiesComponentType,
} from "@/components/form-builder/FormElements";
import { SeparatorHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";

const type: ElementsType = "SeparatorField";
export const SeparatorFieldFormElement: FormElement = {
  type: "SeparatorField",
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: SeparatorHorizontal,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent({ elementInstance }: designerComponentType) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm text-muted-foreground">Separator Field</Label>
      <Separator className="my-2 h-0.5 bg-muted-foreground/50" />
    </div>
  );
}

function FormComponent({ elementInstance }: FormComponentType) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Separator className="my-2 h-0.5 bg-muted-foreground/50" />
    </div>
  );
}

function PropertiesComponent({ elementInstance }: PropertiesComponentType) {
  return <p>This element has no properties.</p>;
}
