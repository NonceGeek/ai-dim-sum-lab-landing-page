import { getDictionary } from './i18n/getDictionary';
import { defaultLocale } from './i18n/config';
import HomePage from './components/HomePage';

export default async function RootHome() {
  const dict = await getDictionary(defaultLocale);
  return <HomePage locale={defaultLocale} dict={dict} />;
}
