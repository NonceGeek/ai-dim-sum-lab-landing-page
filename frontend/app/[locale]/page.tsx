import { getDictionary } from '../i18n/getDictionary';
import { type Locale } from '../i18n/config';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyWeAreHere from '../components/WhyWeAreHere';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Architecture from '../components/Architecture';
import QuickLinks from '../components/QuickLinks';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-base-100 relative overflow-hidden">
      {/* 全局背景装饰 - 只在Hero区域可见的光源效果 */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{height: '100vh'}}>
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        {/* 打光效果 - 与渐变文字呼应，边缘渐变透明 */}
        <div className="absolute inset-0">
          {/* 中心主光源 - 稍微靠右，边缘渐变透明 */}
          <div className="absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/25 via-secondary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          
          {/* 扩散光源1 - 向右上方不规则，边缘渐变透明 */}
          <div className="absolute top-1/4 left-[70%] transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-secondary/20 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.3s'}}></div>
          
          {/* 扩散光源2 - 向左下方不规则，边缘渐变透明 */}
          <div className="absolute bottom-1/4 left-[45%] transform -translate-x-1/2 translate-y-1/2 w-88 h-88 bg-gradient-to-tl from-accent/20 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.8s'}}></div>
          
          {/* 扩散光源3 - 向右下方不规则，边缘渐变透明 */}
          <div className="absolute bottom-1/3 right-1/6 w-72 h-72 bg-gradient-to-tl from-primary/18 via-secondary/12 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.2s'}}></div>
          
          {/* 扩散光源4 - 向左上方不规则，边缘渐变透明 */}
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-accent/15 via-secondary/12 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.6s'}}></div>
          
          {/* 扩散光源5 - 额外的不规则光源，边缘渐变透明 */}
          <div className="absolute top-2/3 right-1/5 w-56 h-56 bg-gradient-to-bl from-primary/16 via-accent/12 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* 扩散光源6 - 另一个不规则光源，边缘渐变透明 */}
          <div className="absolute bottom-1/5 left-1/4 w-48 h-48 bg-gradient-to-tr from-secondary/18 via-primary/14 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2.1s'}}></div>
          
          {/* 扩散光源7 - 最左侧光源，边缘渐变透明 */}
          <div className="absolute top-1/2 left-1/6 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/12 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.7s'}}></div>
          
          {/* 扩散光源8 - 最右侧光源，边缘渐变透明 */}
          <div className="absolute bottom-1/2 right-1/8 transform translate-x-1/2 -translate-y-1/2 w-88 h-88 bg-gradient-to-l from-secondary/15 via-primary/12 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.4s'}}></div>
        </div>
        
        {/* 网格背景装饰 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full decorative-circle"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-secondary/20 rounded-full decorative-circle"></div>
          <div className="absolute bottom-32 left-1/3 w-16 h-16 border border-accent/20 rounded-full decorative-circle"></div>
        </div>
      </div>

      <ScrollProgress />
      <Header locale={locale} dict={dict} />
      
      <div className="container mx-auto py-8 pt-24 lg:pt-28">
        <Hero dict={dict} />

        <WhyWeAreHere dict={dict} />

        <Features dict={dict} />

        <Stats />

        <Architecture dict={dict} />

        <QuickLinks dict={dict} />

        <Footer dict={dict} />
      </div>
    </div>
  );
} 