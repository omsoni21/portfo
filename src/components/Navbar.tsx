import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolio';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
];

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: 'Why Native', href: '#why-native' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled
          ? 'border-white/15 bg-[#07090B]/95 shadow-[0_8px_32px_rgba(0,0,0,0.55)]'
          : 'border-white/8 bg-[#07090B]/85'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <span className="font-display text-lg font-extrabold tracking-tight text-[#A8FF2A]">
            OM
          </span>
          <span aria-hidden="true" className="h-4 w-px bg-white/20" />
          <span className="font-display text-base font-bold tracking-tight text-white">
            {PERSONAL_INFO.name}
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#DDE2E5]/75"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#A8FF2A] after:transition-all after:duration-150 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#A8FF2A]/60 bg-[#A8FF2A]/8 px-4 py-1.5 text-xs font-semibold text-[#A8FF2A] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#A8FF2A] hover:text-[#07090B]"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-[#DDE2E5] transition-colors hover:border-[#A8FF2A]/50 hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-[#07090B]/98 px-4 py-4"
        >
          <div className="flex flex-col gap-1">
            {MOBILE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#DDE2E5] transition-colors hover:bg-[#111516] hover:text-[#A8FF2A]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
