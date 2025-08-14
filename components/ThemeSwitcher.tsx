"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null; // Prevents hydration mismatch
  }
  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border">
        <TabsTrigger value="dark" onClick={() => setTheme("light")}>
          <Sun />
        </TabsTrigger>
        <TabsTrigger value="light" onClick={() => setTheme("dark")}>
          <Moon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
