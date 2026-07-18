import { getDictionary } from '../../i18n/getDictionary';
import { type Locale, locales } from '../../i18n/config';
import KanbanClient from '../../components/KanbanClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function LocaleBoardPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale) || locale === 'zh') {
    notFound();
  }

  const dict = await getDictionary(locale);
  return <KanbanClient locale={locale} dict={dict} />;
}
