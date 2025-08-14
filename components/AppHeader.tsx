"use client";
import React from "react";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function AppHeader() {
  return (
    <nav className="flex justify-between mx-8 my-4">
      <Logo />
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
