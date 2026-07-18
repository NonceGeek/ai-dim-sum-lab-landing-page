import { getDictionary } from '../i18n/getDictionary';
import { defaultLocale } from '../i18n/config';
import KanbanClient from '../components/KanbanClient';

export default async function BoardPage() {
  const dict = await getDictionary(defaultLocale);
  return <KanbanClient locale={defaultLocale} dict={dict} />;
}
