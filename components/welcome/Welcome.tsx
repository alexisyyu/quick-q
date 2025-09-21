"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Bot } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Welcome() {
  const router = useRouter();
  const steps = [
    {
      title: "Create",
      description: "Easily create your questionnaire with the help of AI.",
      image: "",
    },
    {
      title: "Edit",
      description: "Easily edit your questionnaire with our intuitive builder.",
      image: "",
    },
    {
      title: "Preview",
      description:
        "Preview how your questionnaire looks before sharing it with others.",
      image: "",
    },
    {
      title: "Share",
      description: "Share your questionnaire with a link.",
      image: "",
    },
    {
      title: "View Responses",
      description: "View and export responses in real-time with our dashboard.",
      image: "",
    },
    {
      title: "Generate Insights",
      description: "Get automatically generated insights from your responses.",
      image: "",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center flex-1 space-y-4">
      <div className="flex items-center justify-center gap-1">
        <p>Powered by AI</p>
        <Bot className="w-4 h-4 text-primary animate-pulse mb-1" />
      </div>
      <h1 className="font-bold text-4xl text-center">QuickQ</h1>
      <h2 className="text-center text-xl">
        A powerful platform to effortlessly create, share, and analyze
        questionnaires.
      </h2>
      <Button
        className="mb-8 mt-2 text-xl p-4 font-semibold"
        onClick={() => router.push("/sign-in")}
      >
        Try QuickQ
      </Button>
      <div className="flex flex-col max-w-lg">
        <h2 className="font-bold text-2xl text-center">Features</h2>
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-start p-2"
          >
            {index !== 0 && <Separator className="my-2" />}
            <h3 className="font-bold text-lg w-full">{step.title}</h3>
            <p className="w-full">{step.description}</p>
            {step.image && (
              <Image
                loading="lazy"
                src={step.image}
                alt={step.title}
                width={160}
                height={40}
              />
            )}
          </div>
        ))}
      </div>
      {/* footer */}
      <div className="h-8"></div>
    </div>
  );
}
