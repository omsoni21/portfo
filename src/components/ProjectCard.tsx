import { ArrowDownToLine } from 'lucide-react';
import { motion } from 'motion/react';
import type { ProjectItem } from '../types/portfolio';
import { ProjectVisualPreview } from './ProjectVisualPreview';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, index = 0, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{
        scale: 1.015,
        y: -4,
        transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
      }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#111516] p-4 sm:p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#A8FF2A]/70 hover:shadow-[0_0_28px_rgba(168,255,42,0.14)]"
    >
      {/* Minimal Card Face: 1. 16:9 Project Visual  2. Project Name */}
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`Open details for ${project.title}`}
        className="flex flex-1 flex-col text-left focus-visible:outline-none"
      >
        <ProjectVisualPreview project={project} />

        <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-[#A8FF2A]">
          {project.title}
        </h3>
      </button>

      {/* 3. APK Download Button — shown ONLY when an APK URL is available */}
      {project.apkUrl && (
        <div className="mt-4 pt-1">
          <a
            href={project.apkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-full bg-[#A8FF2A] px-4 py-2 text-xs font-semibold text-[#07090B] whitespace-nowrap transition-colors hover:bg-[#99f21a]"
          >
            <ArrowDownToLine className="h-3.5 w-3.5" />
            <span>Download APK</span>
          </a>
        </div>
      )}
    </motion.article>
  );
}
