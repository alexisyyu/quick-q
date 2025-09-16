import { LoaderCircle } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <LoaderCircle className="animate-spin size-12 [animation-duration:1s]" />
    </div>
  );
}
