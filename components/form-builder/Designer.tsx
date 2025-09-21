"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  DragOverEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "../hooks/useDesigner";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function Designer() {
  const {
    elements,
    addElement,
    removeElement,
    updateElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });
  const emptyFieldIdRef = useRef("");

  useDndMonitor({
    onDragOver: (event: DragOverEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;
      const isDroppingOverTopHalfDesignerElement =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverBottomHalfDesignerElement =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        over.data?.current?.isTopHalfDesignerElement ||
        over.data?.current?.isBottomHalfDesignerElement;

      const isDraggableElement =
        isDesignerBtnElement || isDraggingDesignerElement;
      const isDroppableArea =
        isDroppingOverDesignerDropArea ||
        isDroppingOverTopHalfDesignerElement ||
        isDroppingOverBottomHalfDesignerElement;

      const overElementId = over.data?.current?.elementId;
      const overElementIndex = elements.findIndex(
        (el) => el.id === overElementId
      );
      if (isDraggableElement && isDroppableArea) {
        const newElement = FormElements["EmptyField"].construct(
          Date.now().toString().slice(-12)
        );
        console.log("id ref", emptyFieldIdRef.current);
        let emptyFieldId = emptyFieldIdRef.current;
        if (isDroppingOverTopHalfDesignerElement) {
          console.log("current element type", elements[overElementIndex]);
          console.log("prev element type", elements[overElementIndex - 1]);
          if (
            elements[overElementIndex]?.type !== "EmptyField" &&
            elements[overElementIndex - 1]?.type !== "EmptyField"
          ) {
            console.log("adding at", overElementIndex);
            addElement(overElementIndex, newElement);
            emptyFieldId = newElement.id;
          }
        } else if (isDroppingOverBottomHalfDesignerElement) {
          if (
            elements[overElementIndex]?.type !== "EmptyField" &&
            elements[overElementIndex + 1]?.type !== "EmptyField"
          ) {
            addElement(overElementIndex + 1, newElement);
            emptyFieldId = newElement.id;
          }
        } else if (emptyFieldIdRef.current === "") {
          addElement(elements.length, newElement);
          emptyFieldId = newElement.id;
        }
        if (emptyFieldIdRef.current !== emptyFieldId) {
          removeElement(emptyFieldIdRef.current);
          emptyFieldIdRef.current = emptyFieldId;
        }
      }
    },
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) {
        removeElement(emptyFieldIdRef.current);
        emptyFieldIdRef.current = "";
        return;
      }

      if (emptyFieldIdRef.current) {
        console.log("finalize id ref", emptyFieldIdRef.current);
        console.log("elements", elements);
        const type = active.data?.current?.type as ElementsType;
        const activeId = active.data?.current?.elementId;
        const oldElement = elements.find((el) => el.id === activeId);
        let newElement = FormElements[type].construct(
          Date.now().toString().slice(-12)
        );
        if (oldElement) {
          newElement = {
            ...oldElement,
            id: newElement.id,
          };
        }
        updateElement(emptyFieldIdRef.current, newElement);
        emptyFieldIdRef.current = "";
        if (oldElement) {
          removeElement(activeId);
        }
      }
      // const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      // const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      // const isDroppingOverDesignerDropArea =
      //   over.data?.current?.isDesignerDropArea;
      // const isDroppingOverTopHalfDesignerElement =
      //   over.data?.current?.isTopHalfDesignerElement;
      // const isDroppingOverBottomHalfDesignerElement =
      //   over.data?.current?.isBottomHalfDesignerElement;

      // const isDraggableElement =
      //   isDesignerBtnElement || isDraggingDesignerElement;

      // const isDroppableArea =
      //   isDroppingOverDesignerDropArea ||
      //   isDroppingOverTopHalfDesignerElement ||
      //   isDroppingOverBottomHalfDesignerElement;

      // if (isDraggableElement && isDroppableArea) {
      //   const type = active.data?.current?.type as ElementsType;
      //   const activeId = active.data?.current?.elementId;
      //   const oldElement = elements.find((el) => el.id === activeId);
      //   let newElement = FormElements[type].construct(
      //     Date.now().toString().slice(-12)
      //   );
      //   if (oldElement) {
      //     newElement = {
      //       ...oldElement,
      //       id: newElement.id,
      //     };
      //   }
      //   if (isDraggingDesignerElement) {
      //     const activeElement = elements.find((el) => el.id === activeId);
      //     newElement = {
      //       ...activeElement,
      //       id: newElement.id,
      //       type: newElement.type,
      //     };
      //   }
      //   const overElementId = over.data?.current?.elementId;
      //   if (isDroppingOverTopHalfDesignerElement) {
      //     addElement(
      //       elements.findIndex((el) => el.id === overElementId),
      //       newElement
      //     );
      //   } else if (isDroppingOverBottomHalfDesignerElement) {
      //     addElement(
      //       elements.findIndex((el) => el.id === overElementId) + 1,
      //       newElement
      //     );
      //   } else {
      //     addElement(elements.length, newElement);
      //   }
      //   if (oldElement) {
      //     removeElement(activeId);
      //   }
      //   return;
      // }
    },
  });
  return (
    <div className="flex flex-1 gap-2">
      {/* designer canvas */}
      <div
        className="flex-1 h-full overflow-y-auto"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background h-full m-auto rounded-xl flex flex-col flex-1 items-center justify-start overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col gap-2 w-full p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  if (draggable.isDragging) {
    return null;
  }

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative h-32 flex flex-col hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm text-muted-foreground">
              Click for properties or drag to move
            </p>
          </div>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none"
              variant={"destructive"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        </>
      )}

      {/* {topHalf.isOver && (
        <div className="absolute top-0 w-full h-1 rounded-t-md bg-primary"></div>
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full h-1 rounded-b-md bg-primary"></div>
      )} */}

      <div
        className={cn(
          "flex w-full h-32 items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
          element.type === "EmptyField"
            ? "border-primary border-2"
            : cn(
                topHalf.isOver && "border-t-4 border-t-primary",
                bottomHalf.isOver && "border-b-4 border-b-primary"
              )
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}
