import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollToTop from "@/components/ui/ScrollToTop";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xai - From Raw Data to Structured Intelligence",
  description:
    "Transform fragmented data into clear, actionable insight through intelligent structuring and adaptive analysis.",
  openGraph: {
    title: "Xai - AI-Powered Data Intelligence",
    description: "Transform fragmented data into clear, actionable insight.",
    images: ["@/1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xai - AI-Powered Data Intelligence",
    description: "Transform fragmented data into clear, actionable insight.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <LoadingScreen />
        {children}
        <ScrollToTop />

        <div className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference hidden md:block">
          <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </body>
    </html>
  );
}
