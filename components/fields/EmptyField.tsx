import {
  designerComponentType,
  ElementsType,
  FormElement,
} from "@/components/form-builder/FormElements";
import { cn } from "@/lib/utils";
const type: ElementsType = "EmptyField";

export const EmptyFieldFormElement: FormElement = {
  type: "EmptyField",
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: () => <></>,
    label: "Empty Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <></>,
  propertiesComponent: () => <></>,
  validate: () => true,
};

function DesignerComponent({ elementInstanceHeight }: designerComponentType) {
  return (
    <div
      className={cn("h-32 bg-muted-foreground", elementInstanceHeight)}
    ></div>
  );
}
