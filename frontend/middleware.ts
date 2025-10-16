import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './app/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 检查路径是否已经包含语言代码
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 获取用户的首选语言
  // const locale = getLocale(request);
  
  // 重定向到带有语言代码的路径
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

// function getLocale(request: NextRequest): string {
//   // 从请求头中获取Accept-Language
//   const acceptLanguage = request.headers.get('accept-language');
  
//   if (acceptLanguage) {
//     // 解析Accept-Language头
//     const languages = acceptLanguage
//       .split(',')
//       .map(lang => lang.split(';')[0].trim().toLowerCase());
    
//     // 检查是否有匹配的语言
//     for (const lang of languages) {
//       if (lang.startsWith('zh')) {
//         // 如果是中文，优先选择简体中文
//         if (lang.includes('cn') || lang.includes('zh-cn')) {
//           return 'zh';
//         }
//         // 如果是繁体中文或粤语，选择粤语
//         if (lang.includes('hk') || lang.includes('zh-hk') || lang.includes('yue')) {
//           return 'yue';
//         }
//         // 默认选择简体中文
//         return 'zh';
//       }
//       if (lang.startsWith('en')) {
//         return 'en';
//       }
//     }
//   }
  
//   return defaultLocale;
// }

export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)、API 路由，以及所有带文件扩展名的静态资源
    '/((?!_next|api|.*\..*).*)',
  ],
}; 