import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { SectionReveal } from './SectionReveal';

export function Footer() {
  return (
    <footer className="border-t border-[#DDE2E5]/10 bg-[#07090B] py-10">
      <SectionReveal y={14} className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-white">
            {PERSONAL_INFO.name}
          </p>
          <p className="mt-1 text-xs text-[#DDE2E5]/55">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Native Android Developer · Kotlin
            &amp; Jetpack Compose.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#DDE2E5]/70">
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#why-native" className="transition-colors hover:text-white">
            Why Native
          </a>
          <a href="#projects" className="transition-colors hover:text-white">
            Projects
          </a>
          <a href="#education" className="transition-colors hover:text-white">
            Education
          </a>
          <a href="#resume" className="transition-colors hover:text-white">
            Resume
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE2E5]/12 text-[#DDE2E5]/75 transition-colors hover:border-[#A8FF2A]/55 hover:text-[#A8FF2A]"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE2E5]/12 text-[#DDE2E5]/75 transition-colors hover:border-[#A8FF2A]/55 hover:text-[#A8FF2A]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE2E5]/12 text-[#DDE2E5]/75 transition-colors hover:border-[#A8FF2A]/55 hover:text-[#A8FF2A]"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </SectionReveal>
    </footer>
  );
}
