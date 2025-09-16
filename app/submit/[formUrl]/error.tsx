"use client";

import React, { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h2 className="text-center font-bold">
        Something went wrong, please return to homepage
      </h2>
    </div>
  );
}
