import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MotifGuard — AI Automotive Design Intent Auditor",
  description: "Compare a car design sketch with an AI render and see what design intent was preserved, changed, or lost.",
  openGraph: { title: "MotifGuard", description: "AI automotive design intent auditing with visible evidence.", images: ["/og.webp"] },
  twitter: { card: "summary_large_image", title: "MotifGuard", description: "See what your AI car render kept, changed, and lost.", images: ["/og.webp"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
