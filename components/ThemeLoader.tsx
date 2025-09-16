"use client";
import { useState, useEffect } from "react";

export default function ThemeLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    let theme = stored;
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
    setMounted(true);
  }, []);
  if (!mounted) {
    return null; // Prevents hydration mismatch
  }
  return <>{children}</>;
}
