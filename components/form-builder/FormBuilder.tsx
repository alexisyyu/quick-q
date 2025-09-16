"use client";
import React from "react";
import { Form } from "@/schemas/form";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "@/components/hooks/useDesigner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

export default function FormBuilder({ form }: { form: Form }) {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Minimum distance in pixels to start dragging
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // Delay in milliseconds before activation
      tolerance: 5, // Tolerance in pixels for touch activation
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    console.log("Loaded elements:", elements);
    setElements(elements);
    setSelectedElement(null);
    setIsReady(true);
  }, [form, setElements, setSelectedElement, isReady]);

  if (!isReady) return null;

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <div className="flex flex-col w-full h-full items-center justify-center">
          <div className="max-w-md">
            <h1 className="text-4xl text-center font-bold border-b pb-2 mb-10">
              Questionnaire Published!
            </h1>
            <h2 className="text-xl">
              Share this questionnaire using link below.
            </h2>
            <h3 className="text-lg text-muted-foreground border-b pb-10">
              Anyone with the link can view the questionnaire and submit
              responses.
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast("Link copied to clipboard");
                }}
              >
                Copy Link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <MoveLeft /> Go Back To Home
                </Link>
              </Button>

              <Button variant={"link"} asChild>
                <Link href={`/response/${form.id}`} className="gap-2">
                  Questionnaire Responses
                  <MoveRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full flex-1">
        <nav className="flex justify-between border-b-2 px-8 py-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Questionnaire: </span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn formName={form.name} />
            {!form.published && (
              <div className="flex gap-2">
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </div>
            )}
          </div>
        </nav>

        <div className="flex-1 flex w-full relative overflow-y-auto bg-secondary p-2">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
