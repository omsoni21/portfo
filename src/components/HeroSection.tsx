import { ArrowDownToLine, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { useState, type MouseEvent } from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import {
  AndroidBotLogo,
  ComposeLogo,
  FirebaseLogo,
  KotlinLogo,
  NextJsLogo,
  ReactLogo,
} from './TechBrandIcons';

const HERO_SKILLS = [
  'Kotlin',
  'Jetpack Compose',
  'Android SDK',
  'Room Database',
];

export function HeroSection() {
  const [portraitFailed, setPortraitFailed] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const handleHeroMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20"
    >
      {/* Subtle Ambient Background Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] sm:h-[620px] bg-[radial-gradient(ellipse_55%_50%_at_50%_65%,rgba(168,255,42,0.12),transparent)] md:bg-[radial-gradient(ellipse_50%_55%_at_75%_42%,rgba(168,255,42,0.14),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-12 md:gap-6 lg:gap-8">
          {/* Left Column: Identity, Title, Intro, Skills, Status, CTAs & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 md:col-span-6 lg:col-span-6"
          >
            <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm font-medium tracking-wide text-[#A8FF2A]">
              <span>{PERSONAL_INFO.availability}</span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="text-[#DDE2E5]/75">Computer Science Graduate</span>
            </p>

            <h1 className="mt-3 sm:mt-4 font-display text-[clamp(2.25rem,9vw,3.5rem)] md:text-[clamp(2.65rem,4.5vw,4.3rem)] font-extrabold leading-[1.02] tracking-tight text-white uppercase">
              OM <span className="text-[#A8FF2A]">SONI</span>
            </h1>

            <p className="mt-2.5 sm:mt-3 font-display text-[15px] sm:text-lg lg:text-xl font-bold tracking-tight text-[#DDE2E5]">
              Android Developer <span className="text-[#A8FF2A]">|</span> Kotlin • Jetpack Compose
            </p>

            <p className="mt-3.5 sm:mt-4 max-w-xl text-sm sm:text-base leading-[1.68] sm:leading-[1.7] text-[#DDE2E5]/85">
              Hi, I&apos;m Om Soni, a Computer Science graduate passionate about building modern
              Android applications. I work with Kotlin and Jetpack Compose to create clean,
              intuitive, and user-friendly mobile experiences. I also have a foundation in React,
              Next.js, JavaScript, and TypeScript.
            </p>

            <div className="mt-4 sm:mt-5 border-t border-white/10 pt-3.5 sm:pt-4">
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#DDE2E5]/55">
                Core Android Stack
              </p>
              <p className="mt-1.5 font-mono text-xs sm:text-sm font-medium leading-relaxed text-[#A8FF2A]">
                {HERO_SKILLS.join(' · ')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="#projects"
                className="inline-flex min-h-[42px] sm:min-h-[44px] items-center gap-2 rounded-full bg-[#A8FF2A] px-4 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-sm font-semibold text-[#07090B] whitespace-nowrap shrink-0 shadow-[0_0_26px_rgba(168,255,42,0.3)] transition-all duration-150 hover:bg-[#99f21a] hover:shadow-[0_0_34px_rgba(168,255,42,0.45)]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumeDownloadPath}
                download="Om_Soni_Android_Developer_Resume.pdf"
                className="inline-flex min-h-[42px] sm:min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-[#111516]/90 px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-sm font-medium text-white whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:border-[#A8FF2A]/60"
              >
                <ArrowDownToLine className="h-4 w-4 text-[#A8FF2A]" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[42px] sm:min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-[#111516]/90 px-3.5 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-sm font-medium text-white whitespace-nowrap shrink-0 backdrop-blur-md transition-colors duration-150 hover:border-[#A8FF2A]/60"
              >
                <Mail className="h-4 w-4 text-[#A8FF2A]" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-5 text-[13px] sm:text-sm font-medium text-[#DDE2E5]/80">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-[#A8FF2A]"
              >
                <Github className="h-4 w-4 text-[#A8FF2A]" />
                <span>GitHub (@omsoni21)</span>
              </a>

              <span aria-hidden="true" className="text-white/20">
                ·
              </span>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-[#A8FF2A]"
              >
                <Linkedin className="h-4 w-4 text-[#A8FF2A]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Large, Prominent Animated Profile Portrait Directly Beside Intro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 md:col-span-6 lg:col-span-6 flex items-center justify-center py-1 sm:py-0"
            style={{ perspective: 1000 }}
          >
            <div className="relative flex aspect-square w-[min(74vw,272px)] max-w-full items-center justify-center sm:w-[320px] md:w-[304px] lg:w-[400px] xl:w-[445px]">
              {/* Soft Neon-Lime Aura Behind Portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[6%] rounded-full bg-[#A8FF2A]/16 blur-3xl"
              />

              {/* Rotating Orbital Rings */}
              <div
                aria-hidden="true"
                className="animate-orbit-slow pointer-events-none absolute inset-0 rounded-full border border-dashed border-[#A8FF2A]/35"
              />
              <div
                aria-hidden="true"
                className="animate-orbit-reverse pointer-events-none absolute inset-[6%] rounded-full border border-white/12"
              />

              {/* Subtle Floating Tech Icons Positioned Outside the Portrait Boundary */}
              <motion.div
                aria-hidden="true"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1 left-2 sm:top-3 sm:left-4 z-20 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-[#A8FF2A]/45 bg-[#111516]/90 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
              >
                <AndroidBotLogo className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-1 sm:top-10 sm:right-3 z-20 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/15 bg-[#111516]/90 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
              >
                <KotlinLogo className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                animate={{ y: [-4, 5, -4] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-2 left-2 sm:bottom-5 sm:left-5 z-20 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/15 bg-[#111516]/90 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
              >
                <ComposeLogo className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </motion.div>

              {/* Main Large Animated Circular Portrait */}
              <motion.div
                style={{
                  x: parallaxX,
                  y: parallaxY,
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative z-10 aspect-square w-[84%] overflow-hidden rounded-full border-2 border-[#A8FF2A]/85 bg-[#111516] shadow-[0_0_55px_rgba(168,255,42,0.28)]"
              >
                {!portraitFailed ? (
                  <>
                    <img
                      src={PERSONAL_INFO.portraitPath}
                      alt="Om Soni — Android Developer"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitFailed(true)}
                      className="h-full w-full rounded-full object-cover object-top"
                    />
                    {/* Subtle radial vignette so the studio edges melt into the obsidian theme */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_46px_rgba(7,9,11,0.72)] ring-1 ring-inset ring-white/15"
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-[#A8FF2A]">
                    OS
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Technology Stack Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-8 sm:mt-12 rounded-2xl border border-white/10 bg-[#111516]/90 px-4 py-4 sm:px-7 sm:py-5 backdrop-blur-md"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="shrink-0 text-center lg:text-left">
              <p className="font-display text-base sm:text-lg font-bold leading-snug text-white">
                My Technology{' '}
                <span className="text-[#A8FF2A] underline decoration-[#A8FF2A] underline-offset-4">
                  Stack.
                </span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-4 sm:grid sm:grid-cols-7 sm:gap-5 flex-1 lg:pl-6">
              {[
                { label: 'Kotlin', Icon: KotlinLogo },
                { label: 'Jetpack Compose', Icon: ComposeLogo },
                { label: 'Android SDK', Icon: AndroidBotLogo },
                { label: 'Firebase', Icon: FirebaseLogo },
                {
                  label: 'GitHub',
                  Icon: ({ className }: { className?: string }) => (
                    <Github className={`${className ?? ''} text-white`} />
                  ),
                },
                { label: 'Next.js', Icon: NextJsLogo },
                { label: 'React.js', Icon: ReactLogo },
              ].map((tech) => {
                const Icon = tech.Icon;
                return (
                  <div
                    key={tech.label}
                    className="group flex w-[68px] sm:w-auto flex-col items-center gap-2 text-center"
                  >
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/8 bg-[#07090B] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:border-[#A8FF2A]/45">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-[11px] font-medium leading-tight text-[#DDE2E5]/80 group-hover:text-white">
                      {tech.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href="#skills"
              aria-label="Jump to full technical skills"
              className="hidden lg:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A8FF2A]/50 text-[#A8FF2A] transition-colors hover:bg-[#A8FF2A] hover:text-[#07090B]"
            >
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
