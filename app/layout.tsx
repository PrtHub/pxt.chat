import "./globals.css";
import type { Metadata } from "next";
import { Silkscreen, Space_Grotesk, Sora } from "next/font/google";
import { TRPCProvider } from "@/trpc/client";
import { SessionProvider } from "@/modules/auth/provider/session-provider";
import { Toaster } from "@/components/ui/sonner";

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pxt.chat | an open source AI Chat App",
  description:
    "This is a high-performance AI Chat App, leveraging the type-safe, edge-ready power of the T3 Stack. By combining the lightning-fast Drizzle ORM with Neon's serverless database, we've eliminated the bottlenecks. The result is a conversation that flows as fast as you can think, with real-time streaming and a UI that never gets in your way.",
  keywords: [
    "pxt.chat",
    "AI Chat App",
    "T3 Stack",
    "Drizzle ORM",
    "Neon",
    "Serverless Database",
    "High-Performance",
    "Real-Time Streaming",
    "UI",
    "Conversation",
    "Fast",
    "Think",
    "Never Gets In Your Way",
    "Chat GPT",
    "Chat APP",
  ],
  authors: [{ name: "PxT" }],
  openGraph: {
    title: "PxT",
    description:
      "This is a high-performance AI Chat App, leveraging the type-safe, edge-ready power of the T3 Stack. By combining the lightning-fast Drizzle ORM with Neon's serverless database, we've eliminated the bottlenecks. The result is a conversation that flows as fast as you can think, with real-time streaming and a UI that never gets in your way.",
    type: "website",
    locale: "en",
    siteName: "PxT",
  },
  twitter: {
    title: "PxT",
    description:
      "This is a high-performance AI Chat App, leveraging the type-safe, edge-ready power of the T3 Stack. By combining the lightning-fast Drizzle ORM with Neon's serverless database, we've eliminated the bottlenecks. The result is a conversation that flows as fast as you can think, with real-time streaming and a UI that never gets in your way.",
    card: "summary_large_image",
    site: "@PxT",
    creator: "@PxT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${silkscreen.variable} ${sora.variable} antialiased dark`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <TRPCProvider>
            {children}
            <Toaster theme="dark"/>
            </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
