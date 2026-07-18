import { getDictionary } from '../i18n/getDictionary';
import { locales, type Locale } from '../i18n/config';
import HomePage from '../components/HomePage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function LocaleHome({ params }: PageProps) {
  const { locale } = await params;

  // zh 由根路径 / 提供，避免再生成 /zh
  if (!locales.includes(locale) || locale === 'zh') {
    notFound();
  }

  const dict = await getDictionary(locale);
  return <HomePage locale={locale} dict={dict} />;
}
