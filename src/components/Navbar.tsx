"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, observedSections } from "@/data/nav";
import { site } from "@/data/site";
import { SocialIcons } from "@/components/ui/SocialLinks";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useOverlay } from "@/hooks/useOverlay";
import { cn, getInitials } from "@/lib/utils";

/**
 * Sticky navigation.
 *
 * - shrinks and gains a blurred backdrop once the page is scrolled
 * - highlights the section currently in view (`useActiveSection`)
 * - a hairline progress bar tracks reading position
 * - below `lg` it collapses into a full-screen, keyboard-trapped menu
 *
 * Nav hrefs are absolute (`/#about`) so the same bar works on case-study
 * pages, where those sections do not exist.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { activeSection, markActive } = useActiveSection(observedSections);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  useOverlay({ isOpen: isMenuOpen, onClose: closeMenu, containerRef: menuRef });

  /* Scroll drives both the compact state and the progress line. The progress
     value is written straight to the DOM, so scrolling never re-renders the
     navigation. */
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setIsScrolled(y > 16);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, y / scrollable) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out-soft",
          isScrolled
            ? "glass border-line shadow-[0_18px_40px_-38px_rgba(0,0,0,0.9)]"
            : "border-transparent"
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between gap-4 transition-[height] duration-300 ease-out-soft",
            isScrolled ? "h-16" : "h-20"
          )}
        >
          <Link
            href="/#home"
            onClick={() => markActive("home")}
            aria-label={`${site.name} — back to top`}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-accent transition-colors duration-300 group-hover:border-accent">
              <span className="meta-sm font-semibold">{getInitials(site.name)}</span>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="meta-sm font-semibold tracking-[0.14em] text-ink">
                {site.name}
              </span>
              <span className="meta mt-1.5 text-muted">{site.roleLine}</span>
            </span>
          </Link>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`/#${item.id}`}
                      onClick={() => markActive(item.id)}
                      data-active={isActive}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "nav-link inline-flex items-baseline gap-1.5 rounded-md px-3 py-2 text-[13px] transition-colors duration-300",
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      )}
                    >
                      <span className="meta hidden xl:inline">{item.index}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <SocialIcons size="sm" className="hidden md:flex" />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-haspopup="dialog"
              aria-label="Open navigation menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "relative block h-px w-full overflow-hidden transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-0"
          )}
        >
          <span
            ref={progressRef}
            className="absolute inset-0 origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </div>

      {isMenuOpen && (
        /* `h-[100dvh]` measures the *visible* viewport, so on a phone the bottom
           row (social icons and location) cannot end up behind the browser's
           toolbar, which is what `inset-0` alone produces — it resolves against
           the layout viewport. If `dvh` is unsupported the declaration is simply
           dropped and `inset-0` still sizes the panel, so nothing breaks. */
        <div
          ref={menuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className="fixed inset-0 z-[60] h-[100dvh] lg:hidden"
        >
          <div className="glass absolute inset-0" />

          <div className="menu-enter relative flex h-full flex-col">
            <div className="flex h-20 shrink-0 items-center justify-between px-5 sm:px-8">
              <span className="meta-sm font-semibold tracking-[0.14em] text-ink">
                {site.name}
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <X className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Sections"
              className="flex-1 overflow-y-auto px-5 pb-10 sm:px-8"
            >
              <ul className="border-t border-line">
                {navItems.map((item) => (
                  <li key={item.id} className="border-b border-line">
                    <a
                      href={`/#${item.id}`}
                      onClick={() => {
                        markActive(item.id);
                        closeMenu();
                      }}
                      className="group flex items-baseline justify-between gap-4 py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="meta text-muted">{item.index}</span>
                        <span className="text-2xl font-semibold text-ink">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between gap-4">
                <SocialIcons />
                <span className="meta text-muted">{site.location}</span>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}