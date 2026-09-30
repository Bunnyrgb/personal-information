import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "AI-PIRS — AI Personal Information Retrieval & Document Intelligence",
  description: "Ask your documents. Find anything. Instantly. AI-PIRS converts your personal documents into an intelligent vector-indexed semantic knowledge base with source-backed citations.",
  keywords: ["AI Document Retrieval", "Personal RAG", "OCR Search", "Document Intelligence", "Smart Vault", "Privacy First AI"],
  authors: [{ name: "AI-PIRS Inc." }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08090e] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
