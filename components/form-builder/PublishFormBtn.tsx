import React, { use, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { UpdateFormContent, PublishForm } from "@/action/form";
import useDesigner from "@/components/hooks/useDesigner";
import { useRouter } from "next/navigation";

export default function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();
  const router = useRouter();

  const publishForm = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      await PublishForm(id);
      toast("Successfully published the form");
      router.refresh();
    } catch (error) {
      toast.error("Failed to publish the form");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2">Publish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to publish this questionnaire?
          </AlertDialogTitle>
          <AlertDialogDescription>
            After publishing you will not be able to edit the questionnaire.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            {loading ? "Publishing..." : "Yes, publish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
