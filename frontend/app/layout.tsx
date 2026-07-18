import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_SC, Noto_Sans_HK } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const notoSansHK = Noto_Sans_HK({
  subsets: ["latin"],
  variable: "--font-noto-sans-hk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DIMSUM AI 实验室",
  description: "AI 友好的粤语语料库系统与服务真实环境的 AI Agent 系统",
  keywords: ["粤语", "AI", "人工智能", "Cantonese", "LLM", "Safty"],
  authors: [{ name: "DIMSUM AI Labs" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" data-theme="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable} ${notoSansHK.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
