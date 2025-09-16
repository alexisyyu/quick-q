import type { Metadata } from "next";
import { Source_Sans_3, Roboto_Mono, Newsreader } from "next/font/google";

import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import AppHeader from "@/components/AppHeader";
import ThemeLoader from "@/components/ThemeLoader";
import { Toaster } from "sonner";
import DesignerContextProvider from "@/components/context/DesignerContext";
import NextTopLoader from "nextjs-toploader";

const sourceSans3 = Source_Sans_3({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-geist-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickQ: Automatically generate questionnaire using AI",
  description:
    "QuickQ is a tool that helps you create questionnaires quickly and easily using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${sourceSans3.variable} ${robotoMono.variable} ${newsreader.variable} font-sans antialiased`}
        >
          <NextTopLoader />
          <DesignerContextProvider>
            <ThemeLoader>
              <div className="flex flex-col h-screen w-full max-h-screen">
                <AppHeader />
                <main className="flex flex-col flex-1">{children}</main>
                <Toaster />
              </div>
            </ThemeLoader>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
