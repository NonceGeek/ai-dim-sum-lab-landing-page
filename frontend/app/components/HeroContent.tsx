'use client';

import { Rocket } from 'lucide-react';
import LabNewsSlideshow from './LabNewsSlideshow';
import { FadeInUp } from './ScrollReveal';
import labNewsData from '../data/lab-news.json';
import { type Dictionary } from '../i18n/types';

interface HeroContentProps {
  dict: Dictionary;
}

export default function HeroContent({ dict }: HeroContentProps) {
  return (
    <div className="hero-content text-left w-full max-w-none p-8 lg:p-12 relative z-10 pt-0 ">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(312px,408px)] xl:grid-cols-[minmax(0,1fr)_minmax(336px,456px)] gap-10 xl:gap-14 items-start">
        {/* 左下角内容区域 */}
        <div className="max-w-7xl -mt-10 min-w-0">
          {/* 第一行：DIMSUM AI 渐变文字 */}
          <FadeInUp delay={0.1}>
            <h1 className="text-3xl lg:text-5xl font-black tech-heading mb-2 leading-tight">
              <span className="hero-gradient-text">
                {dict.hero.title}
              </span>
            </h1>
          </FadeInUp>

          {/* 第二行：副标题 */}
          <FadeInUp delay={0.3}>
            <h2 className="text-base lg:text-xl font-bold text-base-content mb-6 leading-tight">
              {dict.hero.subtitle}
            </h2>
          </FadeInUp>
          
          {/* 第三行：描述 */}
          <FadeInUp delay={0.5}>
            <p className="text-sm lg:text-base text-base-content/80 mb-8 leading-loose tech-text max-w-4xl">
              {dict.hero.description.split('\n').map((line, index) => (
                <span key={index}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                  {index < dict.hero.description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.5}>
            <p className="text-sm lg:text-base text-base-content/80 mb-8 leading-loose tech-text max-w-4xl">
              {dict.hero.description_2.split('\n').map((line, index) => (
                <span key={index}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong className="hero-gradient-text" key={partIndex}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                  {index < dict.hero.description_2.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </FadeInUp>

          {/* 按钮组 */}
          <FadeInUp delay={0.7}>
            <div className="flex gap-4 flex-wrap">
              <a href="#why-we-are-here" className="btn btn-primary btn-base group relative overflow-hidden btn-shimmer">
                <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {dict.hero.getStarted}
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* mt 是轮播图向下移动的像素值 */}
        <FadeInUp delay={0.35} className="w-full justify-self-center lg:justify-self-end mt-[25px]">
          <LabNewsSlideshow items={labNewsData.items} />
        </FadeInUp>
      </div>
    </div>
  );
} 