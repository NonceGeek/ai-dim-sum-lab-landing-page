import type { Metadata } from "next";
import { locales, type Locale } from "../i18n/config";
import LocaleHtmlLang from "../components/LocaleHtmlLang";

export async function generateStaticParams() {
  // 默认语言 zh 由根路径 / 提供，这里只生成带前缀的语言路由
  return locales.filter((locale) => locale !== "zh").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    en: "DIMSUM AI Labs",
    zh: "DIMSUM AI 实验室",
    yue: "DIMSUM AI 實驗室"
  };
  
  const descriptions = {
    en: "AI-Friendly Cantonese Corpus System and AI Agent System Serving Real-World Environments",
    zh: "AI 友好的粤语语料库系统与服务真实环境的 AI Agent 系统",
    yue: "AI 友好嘅粵語語料庫系統同埋服務真實環境嘅 AI Agent 系統"
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: ["粤语", "AI", "人工智能", "Cantonese", "LLM", "Safty"],
    authors: [{ name: "DIMSUM AI Labs" }],
    robots: "index, follow",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/logo.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <>
      <LocaleHtmlLang locale={locale} />
      {children}
    </>
  );
}
