"use client";
import React from "react";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function AppHeader() {
  return (
    <nav className="flex justify-between lg:mx-8 lg:my-4 mx-2 my-1">
      <Logo />
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
