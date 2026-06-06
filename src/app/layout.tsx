import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "RayTech Account",
    template: "%s | RayTech Account",
  },
  description:
    "Single Sign-On account platform for the RayTech ecosystem: FlowNote, FlowPaste, FlowSummary, FlowTask, and FlowCV.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000"),
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/brand/raytech-account-icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
