"use client";
import React, { useCallback, useTransition } from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormElements,
  FormElementInstance,
} from "@/components/form-builder/FormElements";
import { toast } from "sonner";
import { SubmitForm } from "@/action/form";
import { sub } from "date-fns";

export default function FormSubmitComponent({
  formUrl,
  content,
}: {
  content: FormElementInstance[];
  formUrl: string;
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(0);
  const [submitted, setSubmitted] = useState(
    window.localStorage.getItem(`submitted_${formUrl}`) === "true"
  );
  const [pending, startTransition] = useTransition();

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const validateForm: () => boolean = useCallback(() => {
    for (const element of content) {
      const currentVal = formValues.current[element.id] ?? "";
      const isValid = FormElements[element.type].validate(element, currentVal);
      formErrors.current[element.id] = !isValid;
    }
    return Object.values(formErrors.current).every((isErr) => isErr === false);
  }, [content]);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      console.log("formErrors", formErrors.current);
      setRenderKey((prev) => (prev + 1) & 1);
      toast.error("Please check highlighted fields");
      return;
    }
    console.log("values", formValues.current);

    try {
      const JsonContent = JSON.stringify(formValues.current);
      const response = await SubmitForm(formUrl, JsonContent);
      console.log("submitted response", response);
      // window.localStorage.setItem(`submitted_${formUrl}`, "true");
      setSubmitted(true);
    } catch {
      toast.error("There was an error submitting the form");
    }
  };
  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-lg flex flex-col lg:gap-4 gap-1 flex-grow bg-background w-full lg:p-8 p-1 overflow-y-auto border shadow rounded">
          <h1 className="text-2xl font-bold">Thank you for your submission!</h1>
          You can close this page now.
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center w-full h-full items-center lg:p-8 sm:p-1">
      <div
        key={renderKey}
        className="max-w-lg flex flex-col lg:gap-4 gap-1 flex-grow bg-background w-full lg:p-8 p-1 overflow-y-auto border shadow rounded"
      >
        {content.map((element) => {
          const Element = FormElements[element.type].formComponent;
          return (
            <Element
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isValid={!formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => startTransition(submitForm)}
          disabled={pending}
        >
          {pending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
