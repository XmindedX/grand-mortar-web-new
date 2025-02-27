import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { auth } from "@/auth";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grand Mortar",
  description: "",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {

  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
