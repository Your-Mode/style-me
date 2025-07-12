import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import AnalyticsListener from "@/components/AnalyticsListener";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Style Me - 개인 맞춤 스타일링",
  description: "AI 기반 골격진단으로 당신만의 완벽한 스타일을 찾아보세요",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
    <body className={inter.className}>
    <Providers>
      {children}
      <AnalyticsListener />
    </Providers>
    </body>
    </html>
  );
}
