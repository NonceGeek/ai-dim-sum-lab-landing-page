'use client';

import { useEffect } from 'react';
import { type Locale } from '../i18n/config';

/** Sync <html lang> for non-default locale routes under /[locale]. */
export default function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
