'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';

export interface LabNewsSlide {
  title: string;
  image: string;
  link: string;
}

interface LabNewsSlideshowProps {
  items: LabNewsSlide[];
}

function isRemoteImage(src: string) {
  return src.startsWith('http://') || src.startsWith('https://');
}

export default function LabNewsSlideshow({ items }: LabNewsSlideshowProps) {
  const [active, setActive] = useState(0);

  const go = useCallback(
    (delta: number) => {
      if (items.length === 0) return;
      setActive((i) => (i + delta + items.length) % items.length);
    },
    [items.length],
  );

  if (items.length === 0) return null;

  const current = items[active];

  return (
    <div className="lab-news-slideshow w-full max-w-xl lg:max-w-none lg:sticky lg:top-24">
      <div className="rounded-2xl border border-base-content/10 bg-base-100/40 backdrop-blur-sm shadow-lg overflow-hidden">
        <div className="relative aspect-video bg-base-200/50">
          {items.map((item, index) => (
            <a
              key={item.link + item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 block transition-opacity duration-500 ease-out ${
                index === active ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={index !== active}
              tabIndex={index === active ? 0 : -1}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 28vw, 100vw"
                unoptimized={isRemoteImage(item.image)}
                priority={index === 0}
              />
            </a>
          ))}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-3 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-base-content/30 bg-base-100/95 text-base-content shadow-lg backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-content focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 shrink-0" strokeWidth={2.25} aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-3 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-base-content/30 bg-base-100/95 text-base-content shadow-lg backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-content focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 shrink-0" strokeWidth={2.25} aria-hidden />
              </button>
            </>
          )}
        </div>
        <div className="p-4 border-t border-base-content/10">
          <a
            href={current.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-base-content hover:text-primary line-clamp-2 transition-colors"
          >
            {current.title}
          </a>
          {items.length > 1 && (
            <div className="flex gap-1.5 justify-center mt-3" role="tablist" aria-label="Slides">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  className={`h-1.5 rounded-full transition-all ${
                    index === active ? 'w-6 bg-primary' : 'w-1.5 bg-base-content/25 hover:bg-base-content/40'
                  }`}
                  onClick={() => setActive(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
