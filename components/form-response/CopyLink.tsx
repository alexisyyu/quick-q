"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CopyLink({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = useState(false);
  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start lg:gap-8 gap-2">
      <div className="flex lg:flex-row flex-col w-full justify-between gap-2 lg:items-center items-start flex-1">
        <h2 className="font-bold">Questionnaire Link:</h2>
        <Input className="flex-1" readOnly value={shareLink} />
      </div>
      <Button
        className="w-48"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast("Link copied to clipboard");
        }}
      >
        Copy Link
      </Button>
    </div>
  );
}
