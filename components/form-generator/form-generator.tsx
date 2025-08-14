"use client";
import { useEffect, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { generateForm } from "@/lib/actions/generateForm";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate Form"}
    </Button>
  );
}
const initialState: {
  message: string;
  data?: JSON;
} = {
  message: "",
};

export default function FormGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction] = useActionState(generateForm, initialState);
  useEffect(() => {
    if (formState.message === "success") {
      setIsOpen(false);
    }
    console.log("Generated Form Data:", formState);
  }, [formState]);

  const onFormCreate = () => {
    setIsOpen(true);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={onFormCreate}>Create Form</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Describe what your questionnaire is about, and what data you want to collect."
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <SubmitButton />
            <Button variant="link">Create manually</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
