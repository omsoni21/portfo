import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  ExternalLink,
  Github,
  Link2,
  RefreshCw,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolio';
import type {
  GitHubActivityResponse,
  GitHubRepository,
  ProjectItem,
} from '../types/portfolio';
import {
  applySeoMetadata,
  getBioSeoMetadata,
  getProjectSeoMetadata,
} from '../utils/seo';
import { FreshKartInteractiveMockup } from './demos/FreshKartInteractiveMockup';
import { TaskflowInteractiveDemo } from './demos/TaskflowInteractiveDemo';
import { ProjectCard } from './ProjectCard';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import { SectionReveal } from './SectionReveal';

type FilterOption = 'android' | 'all' | 'web';

function normalizeRepoSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/^https?:\/\/github\.com\/omsoni21\//, '')
    .replace(/[^a-z0-9]/g, '');
}

function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatUpdatedTimeline(isoDate: string): string | undefined {
  if (!isoDate) return undefined;
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return `Updated ${parsed.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })}`;
}

const KNOWN_ANDROID_TECH = [
  'Jetpack Compose',
  'Material Design 3',
  'Room Database',
  'Dagger Hilt',
  'WorkManager',
  'Vico Charts',
  'Coroutines',
  'Firebase',
  'Retrofit',
  'MVVM',
];

function extractTechFromDescription(description: string | null): string[] {
  if (!description) return [];
  const lower = description.toLowerCase();
  return KNOWN_ANDROID_TECH.filter((tech) =>
    lower.includes(tech.toLowerCase())
  );
}

const PROJECT_THUMBNAIL_MAP: Record<string, string> = {
  habitflow: '/assets/projects/habitflow.jpg',
  fitnesstracker: '/assets/projects/fitnesstracker.jpg',
  taskflow: '/assets/projects/taskflow.jpg',
  expensetracker: '/assets/projects/expense-tracker.jpg',
  expensetrackerandroidapp: '/assets/projects/expense-tracker.jpg',
  freshkart: '/assets/projects/freshkart.jpg',
  railspacelease: '/assets/projects/railspace-lease.jpg',
  railspaceleasemanagementsystem: '/assets/projects/railspace-lease.jpg',
  alumniplatform: '/assets/projects/alumni-platform.jpg',
  alumniassociationplatform: '/assets/projects/alumni-platform.jpg',
};

function resolveProjectThumbnail(slugOrTitle: string): string | undefined {
  const slug = normalizeRepoSlug(slugOrTitle);
  return PROJECT_THUMBNAIL_MAP[slug];
}

function mapGitHubRepoToProject(repo: GitHubRepository): ProjectItem {
  const languageLabel = repo.language || 'Kotlin';
  const formattedTopics = repo.topics
    .slice(0, 3)
    .map((topic) => topic.replace(/[-_]+/g, ' '));
  const descTech = extractTechFromDescription(repo.description);
  const techList = Array.from(
    new Set([languageLabel, ...descTech, ...formattedTopics, 'Android SDK'])
  ).slice(0, 4);

  const highlights: string[] = [
    `Public ${languageLabel} Android project maintained at @omsoni21`,
    descTech.length > 0
      ? `Built using ${descTech.slice(0, 3).join(', ')}`
      : repo.topics.length > 0
      ? `Tagged with ${repo.topics.slice(0, 3).join(', ')}`
      : 'Native Android architecture with clean modular structure',
    repo.homepage
      ? 'Includes live project documentation or release preview link'
      : 'Full source code and commit history available on GitHub',
  ];

  const cleanDescription =
    repo.description?.trim() ||
    `Open-source ${languageLabel} Android repository fetched automatically from GitHub (@omsoni21).`;

  return {
    id: `github-${repo.id}`,
    title: formatRepoTitle(repo.name),
    category: 'android',
    platformLabel: `Native Android · ${languageLabel}`,
    timeline: formatUpdatedTimeline(repo.updatedAt),
    status: 'Open Source',
    description: cleanDescription,
    technologies: techList,
    highlights,
    githubUrl: repo.htmlUrl,
    liveUrl: repo.homepage || undefined,
    screenshotPath: resolveProjectThumbnail(repo.name),
    previewType: 'github-android',
    fromGitHub: true,
  };
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterOption>('android');
  const [githubAndroidRepos, setGithubAndroidRepos] = useState<GitHubRepository[]>([]);
  const [syncingGitHub, setSyncingGitHub] = useState(true);
  const [githubSyncedCount, setGithubSyncedCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<'demo' | 'preview'>('preview');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/github')
      .then((res) => res.json())
      .then((json: GitHubActivityResponse) => {
        if (!active) return;
        if (json.available && Array.isArray(json.androidRepositories)) {
          setGithubAndroidRepos(json.androidRepositories);
          setGithubSyncedCount(json.androidRepositories.length);
        }
      })
      .catch(() => {
        // Fallback smoothly to curated projects if GitHub is temporarily unreachable
      })
      .finally(() => {
        if (active) setSyncingGitHub(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      applySeoMetadata(getBioSeoMetadata());
      if (window.location.pathname.startsWith('/projects/')) {
        window.history.replaceState(null, '', '/');
      }
      return;
    }

    setModalTab('preview');
    setCopiedLink(false);

    applySeoMetadata(getProjectSeoMetadata(selectedProject));
    window.history.replaceState(
      null,
      '',
      `/projects/${encodeURIComponent(selectedProject.id)}`
    );

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  const allProjects = useMemo(() => {
    const knownSlugs = new Set<string>();
    const repoBySlug = new Map<string, GitHubRepository>();

    for (const repo of githubAndroidRepos) {
      repoBySlug.set(normalizeRepoSlug(repo.name), repo);
    }

    const enrichedCurated = PROJECTS.map((project) => {
      const titleSlug = normalizeRepoSlug(project.title);
      const urlSlug = project.githubUrl ? normalizeRepoSlug(project.githubUrl) : '';
      knownSlugs.add(titleSlug);
      if (urlSlug) knownSlugs.add(urlSlug);

      const matchedRepo = repoBySlug.get(urlSlug) ?? repoBySlug.get(titleSlug);
      return {
        ...project,
        githubUrl: project.githubUrl || matchedRepo?.htmlUrl,
        screenshotPath:
          project.screenshotPath ||
          resolveProjectThumbnail(project.id) ||
          resolveProjectThumbnail(project.title),
      };
    });

    const extraGitHubProjects = githubAndroidRepos
      .filter((repo) => {
        const slug = normalizeRepoSlug(repo.name);
        return !knownSlugs.has(slug);
      })
      .map(mapGitHubRepoToProject);

    return [...enrichedCurated, ...extraGitHubProjects];
  }, [githubAndroidRepos]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/about' || path === '/bio') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!path.startsWith('/projects/')) return;
    const targetSlug = decodeURIComponent(
      path.replace(/^\/projects\//, '').split('/')[0] || ''
    ).toLowerCase();
    if (!targetSlug) return;

    const matched = allProjects.find((p) => {
      const idSlug = p.id.toLowerCase();
      const normalizedTitle = normalizeRepoSlug(p.title);
      return (
        idSlug === targetSlug ||
        normalizedTitle === normalizeRepoSlug(targetSlug)
      );
    });
    if (matched) {
      if (matched.category === 'web') setFilter('all');
      setSelectedProject(matched);
    }
  }, [allProjects]);

  const counts = useMemo(
    () => ({
      android: allProjects.filter((p) => p.category === 'android').length,
      all: allProjects.length,
      web: allProjects.filter((p) => p.category === 'web').length,
    }),
    [allProjects]
  );

  const filteredProjects = useMemo(
    () =>
      allProjects.filter((project) => {
        if (filter === 'all') return true;
        return project.category === filter;
      }),
    [allProjects, filter]
  );

  const selectedHasInteractiveDemo =
    selectedProject?.previewType === 'taskflow' ||
    selectedProject?.previewType === 'freshkart';

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Filter Controls */}
        <SectionReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#A8FF2A]">Selected Work</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              My <span className="text-[#A8FF2A]">Android</span> &amp; Engineering Projects.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#DDE2E5]/75">
              Native Android projects automatically synced from{' '}
              <a
                href={`${PERSONAL_INFO.githubUrl}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-[#A8FF2A] hover:underline"
              >
                <span>GitHub (@omsoni21)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              . Click any project card to explore its architecture, features, technologies, and
              interactive demos.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div
              role="tablist"
              aria-label="Filter projects by platform"
              className="flex flex-wrap gap-2"
            >
              {(
                [
                  { key: 'android', label: `Android Apps (${counts.android})` },
                  { key: 'all', label: `All Projects (${counts.all})` },
                  { key: 'web', label: `Web Apps (${counts.web})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    filter === tab.key
                      ? 'bg-[#A8FF2A] font-semibold text-[#07090B]'
                      : 'border border-white/15 bg-[#111516] text-[#DDE2E5]/80 hover:border-[#A8FF2A]/45 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {syncingGitHub ? (
              <p className="inline-flex items-center gap-1.5 text-xs text-[#DDE2E5]/60">
                <RefreshCw className="h-3 w-3 animate-spin text-[#A8FF2A]" />
                <span>Syncing public Android repositories from GitHub...</span>
              </p>
            ) : githubSyncedCount > 0 ? (
              <p className="text-xs text-[#DDE2E5]/60">
                Synced {githubSyncedCount} public Android{' '}
                {githubSyncedCount === 1 ? 'repository' : 'repositories'} from @omsoni21
              </p>
            ) : null}
          </div>
        </SectionReveal>

        {/* Responsive Multi-Column Grid: 1 col mobile, 2 cols tablet/desktop, 3 cols wide desktop */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Framer Motion Project Details Modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                key="project-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} project details`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#111516] p-5 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.75)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-medium text-[#A8FF2A]">
                    {selectedProject.platformLabel}
                    {selectedProject.timeline ? ` · ${selectedProject.timeline}` : ''}
                    {` · ${selectedProject.status}`}
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-[#DDE2E5] transition-colors hover:border-[#A8FF2A]/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {selectedHasInteractiveDemo && (
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalTab('demo')}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      modalTab === 'demo'
                        ? 'bg-[#A8FF2A] font-semibold text-[#07090B]'
                        : 'border border-white/15 bg-[#07090B] text-[#DDE2E5]/80 hover:text-white'
                    }`}
                  >
                    {selectedProject.previewType === 'taskflow'
                      ? 'Interactive Guided Tour'
                      : 'Customer & Seller Simulation'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      modalTab === 'preview'
                        ? 'bg-[#A8FF2A] font-semibold text-[#07090B]'
                        : 'border border-white/15 bg-[#07090B] text-[#DDE2E5]/80 hover:text-white'
                    }`}
                  >
                    Full Screenshot / Preview
                  </button>
                </div>
              )}

              <div className="mt-4">
                {selectedHasInteractiveDemo && modalTab === 'demo' ? (
                  selectedProject.previewType === 'taskflow' ? (
                    <TaskflowInteractiveDemo />
                  ) : (
                    <FreshKartInteractiveMockup />
                  )
                ) : (
                  <ProjectVisualPreview project={selectedProject} />
                )}
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDE2E5]/60">
                    Description
                  </h4>
                  <p className="mt-1.5 text-sm leading-[1.7] text-[#DDE2E5]/85">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDE2E5]/60">
                    Key Features
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {selectedProject.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-[#DDE2E5]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A8FF2A]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDE2E5]/60">
                    Tech Stack
                  </h4>
                  <p className="mt-1.5 font-mono text-xs text-[#A8FF2A]">
                    {selectedProject.technologies.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/15 bg-[#07090B] px-4 py-2 text-xs font-medium text-white whitespace-nowrap transition-colors hover:border-[#A8FF2A]/60"
                  >
                    <Github className="h-4 w-4 text-[#A8FF2A]" />
                    <span>View on GitHub</span>
                  </a>
                )}

                {selectedProject.apkUrl && (
                  <a
                    href={selectedProject.apkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#A8FF2A] px-4 py-2 text-xs font-semibold text-[#07090B] whitespace-nowrap transition-colors hover:bg-[#99f21a]"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    <span>Download APK</span>
                  </a>
                )}

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/15 bg-[#07090B] px-4 py-2 text-xs font-medium text-white whitespace-nowrap transition-colors hover:border-[#A8FF2A]/60"
                  >
                    <ExternalLink className="h-4 w-4 text-[#A8FF2A]" />
                    <span>Live Site</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/projects/${encodeURIComponent(
                      selectedProject.id
                    )}`;
                    navigator.clipboard?.writeText(shareUrl).then(() => {
                      setCopiedLink(true);
                      window.setTimeout(() => setCopiedLink(false), 2200);
                    });
                  }}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/15 bg-[#07090B] px-4 py-2 text-xs font-medium text-[#DDE2E5] whitespace-nowrap transition-colors hover:border-[#A8FF2A]/60 hover:text-white"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-4 w-4 text-[#A8FF2A]" />
                      <span className="text-[#A8FF2A]">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4 text-[#A8FF2A]" />
                      <span>Share Project Link</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
