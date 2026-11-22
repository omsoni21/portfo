import {
  Atom,
  Bell,
  Box,
  Braces,
  Code,
  Code2,
  Compass,
  Cpu,
  Database,
  FileCode,
  Flame,
  FolderGit2,
  GitBranch,
  GitFork,
  Github,
  Globe,
  Layers,
  Layout,
  Package,
  Paintbrush,
  Palette,
  Send,
  Sliders,
  Smartphone,
  TabletSmartphone,
  Terminal,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolio';
import { SectionReveal } from './SectionReveal';

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code,
  layers: Layers,
  smartphone: Smartphone,
  palette: Palette,
  terminal: Terminal,
  database: Database,
  cpu: Cpu,
  compass: Compass,
  'git-fork': GitFork,
  'folder-git': FolderGit2,
  zap: Zap,
  sliders: Sliders,
  globe: Globe,
  flame: Flame,
  bell: Bell,
  'git-branch': GitBranch,
  github: Github,
  package: Package,
  send: Send,
  'code-2': Code2,
  'tablet-smartphone': TabletSmartphone,
  atom: Atom,
  box: Box,
  'file-code': FileCode,
  braces: Braces,
  layout: Layout,
  paintbrush: Paintbrush,
  wind: Wind,
};

export function SkillsSection() {
  const primaryCategory = SKILL_CATEGORIES.find((cat) => cat.isPrimary);
  const secondaryCategories = SKILL_CATEGORIES.filter((cat) => !cat.isPrimary);

  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="max-w-2xl">
          <p className="text-xs font-medium text-[#A8FF2A]">Capabilities</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical Skills
          </h2>
          <p className="mt-3 text-[15px] text-[#DDE2E5]/75">
            Focused on Native Android application development with Kotlin and Jetpack Compose,
            supported by modern architecture patterns and web fundamentals.
          </p>
        </SectionReveal>

        {primaryCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 rounded-2xl border border-[#A8FF2A]/35 bg-[#111516] p-6 sm:p-8 shadow-[0_0_32px_rgba(198,255,77,0.06)]"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {primaryCategory.title}
                </h3>
                <p className="text-sm text-[#DDE2E5]/70">{primaryCategory.subtitle}</p>
              </div>
              <span className="font-mono text-xs text-[#A8FF2A]">
                {primaryCategory.skills.length} Core Technologies
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {primaryCategory.skills.map((skill, idx) => {
                const Icon = ICON_MAP[skill.iconKey] ?? Code;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    whileHover={{
                      y: -2,
                      transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
                    }}
                    className="group flex items-center gap-3 rounded-xl border border-[#DDE2E5]/10 bg-[#07090B] px-4 py-3.5 transition-colors hover:border-[#A8FF2A]/55"
                  >
                    <motion.span
                      className="inline-flex shrink-0 text-[#A8FF2A]"
                      whileHover={{ rotate: 8, scale: 1.15 }}
                      transition={{ duration: 0.16 }}
                    >
                      <Icon className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
                    </motion.span>
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {secondaryCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-48px' }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[#DDE2E5]/10 bg-[#111516] p-6"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                {category.title}
              </h3>
              <p className="mt-1 text-xs text-[#DDE2E5]/55">{category.subtitle}</p>

              <ul className="mt-5 divide-y divide-[#DDE2E5]/10">
                {category.skills.map((skill) => {
                  const Icon = ICON_MAP[skill.iconKey] ?? Code;
                  return (
                    <li
                      key={skill.name}
                      className="group flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#DDE2E5]/65 transition-all duration-150 group-hover:scale-110 group-hover:text-[#A8FF2A]" />
                      <span className="text-sm text-[#DDE2E5] transition-colors group-hover:text-white">
                        {skill.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
