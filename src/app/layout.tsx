import type { Metadata } from "next";
import { Neuton, Noto_Sans } from "next/font/google";
import "./globals.css";

const neuton = Neuton({
  variable: "--font-neuton",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800"],
});

const noto_sans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sid Khanna – Robotics & AI Engineer",
  description: "Hi! I'm Sid — a robotics + AI engineer from UofT. This is my personal AI-powered portfolio.",
  metadataBase: new URL("https://sidkhanna.dev"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${noto_sans.variable} ${neuton.variable} antialiased bg-[#0a0a0a] text-white`}>
        {children}
      </body>
    </html>
  );
}
