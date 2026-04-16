"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SmoothScroll from "./SmoothScroll";
import LanguageSwitcher from "./LanguageSwitcher";
import { type Locale } from "../i18n/config";
import { type Dictionary } from "../i18n/types";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage =
    pathname.includes("/" + locale) && !pathname.includes("/board");

  const navItems = [{ label: dict.navigation.home, id: "hero", href: "/" }];

  const externalNavItems = [
    { label: dict.navigation.searchEngine, href: "https://search.aidimsum.com/" },
    { label: dict.navigation.library, href: "https://search.aidimsum.com/library" },
    { label: dict.navigation.appStore, href: "https://search.aidimsum.com/appStore" },
    { label: dict.navigation.docs, href: "https://search.aidimsum.com/docs" },
    { label: dict.navigation.projectBoard, href: "https://github.com/NonceGeek/dim-sum-app/issues" },
  ];

  const renderNavItem = (item: {
    label: string;
    id?: string;
    href: string;
  }) => {
    if (isHomePage && item.id) {
      return (
        <SmoothScroll
          targetId={item.id}
          className="text-base-content hover:text-primary transition-all duration-300 hover:bg-primary/20 hover:backdrop-blur-md hover:scale-105 hover:translate-x-1"
          style={{ transitionDelay: `${50}ms` }}
        >
          {item.label}
        </SmoothScroll>
      );
    } else {
      return (
        <Link
          href={item.href + "#" + item.id}
          className="text-base-content hover:text-primary transition-all duration-300 hover:bg-primary/20 hover:backdrop-blur-md hover:scale-105 hover:translate-x-1"
          style={{ transitionDelay: `${50}ms` }}
        >
          {item.label}
        </Link>
      );
    }
  };

  const renderDesktopNavItem = (item: {
    label: string;
    id?: string;
    href: string;
  }) => {
    if (isHomePage && item.id) {
      return (
        <SmoothScroll
          targetId={item.id}
          className="text-base-content hover:text-primary transition-all duration-300 hover:bg-primary/20 hover:backdrop-blur-md hover:scale-105 relative group"
          style={{ transitionDelay: `${100}ms` }}
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </SmoothScroll>
      );
    } else {
      return (
        <Link
          href={item.href + "#" + item.id}
          className="text-base-content hover:text-primary transition-all duration-300 hover:bg-primary/20 hover:backdrop-blur-md hover:scale-105 relative group"
          style={{ transitionDelay: `${100}ms` }}
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
      );
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] border-b bg-base-100/20 backdrop-blur-xl border-base-300/20 shadow-lg transition-all duration-700 ease-out">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-4">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden transition-all duration-300 hover:bg-primary/30 hover:backdrop-blur-md hover:scale-110"
              >
                <Menu className="w-6 h-6 text-primary transition-all duration-300" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100/60 backdrop-blur-xl rounded-box w-64 border border-base-100/20"
              >
                {navItems.map((item) => (
                  <li key={item.id || item.href}>{renderNavItem(item)}</li>
                ))}
                {externalNavItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content hover:text-primary transition-all duration-300 hover:bg-primary/20 hover:backdrop-blur-md hover:scale-105 hover:translate-x-1"
                      style={{ transitionDelay: `${50}ms` }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
            >
              <img
                src="/logo.png"
                alt="DimSum Logo"
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-xl lg:text-2xl font-bold tech-heading text-primary min-w-[10rem] lg:min-w-[12rem]">
                DIMSUM AI Labs
              </h1>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <ul className="menu menu-horizontal px-1">
              {navItems.map((item) => (
                <li key={item.id || item.href}>{renderDesktopNavItem(item)}</li>
              ))}
              {externalNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base-content hover:text-primary transition-all duration-300 hover:bg-primary/20 hover:backdrop-blur-md hover:scale-105 relative group"
                    style={{ transitionDelay: `${100}ms` }}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* 语言切换器 */}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            {/* 移动端语言切换器 */}
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
