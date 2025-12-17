import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

// * Separate viewport export is required for high performance/SEO scores
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c5dfa",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tl-events-app.vercel.app'),
  title: {
    template: '%s | Timeleft Admin',
    default: 'Events Dashboard | Timeleft Admin',
  },
  description: "Internal events management platform for Timeleft back-office operations.",
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
