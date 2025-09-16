import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useDesigner from "@/components/hooks/useDesigner";
import { FormElements } from "@/components/form-builder/FormElements";

export default function PreviewDialogBtn({ formName }: { formName: string }) {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full sm:max-w-full flex flex-col flex-grow p-2 gap-0">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-muted-foreground px-4">
            Form preview
          </DialogTitle>
          <DialogDescription className="text-muted-foreground px-4 mb-2">
            This is how your questionnaire will look like.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center overflow-y-auto py-2">
          <div className="max-w-2xl flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
