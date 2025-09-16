import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import useDesigner from "@/components/hooks/useDesigner";
import { UpdateFormContent } from "@/action/form";
import { toast } from "sonner";

export default function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast("Success", {
        description: "Questionnaire saved successfully",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to save questionnaire",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      {loading ? "Saving..." : "Save"}
    </Button>
  );
}
