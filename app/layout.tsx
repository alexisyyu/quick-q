import type { Metadata } from "next";
import { Source_Sans_3, Roboto_Mono, Newsreader } from "next/font/google";

import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import AppHeader from "@/components/AppHeader";

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
  title: "quickQ: Automatically generate questionnaire using AI",
  description:
    "quickQ is a tool that helps you create questionnaires quickly and easily using AI.",
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
          <div className="flex flex-col min-h-screen min-w-full max-h-screen">
            <AppHeader />
            <main className="flex w-full flex-1">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
