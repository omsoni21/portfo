import { Check, Code2, Smartphone } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, type MouseEvent } from 'react';
import { AndroidBotLogo, ComposeLogo, KotlinLogo } from './TechBrandIcons';

const HERO_KOTLIN_SNIPPET = `@Composable
fun TaskflowScreen(
    uiState: TaskUiState,
    onToggleTask: (Long) -> Unit
) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        items(uiState.tasks, key = { it.id }) { task ->
            TaskCard(
                title = task.title,
                completed = task.isDone,
                onCheckedChange = { onToggleTask(task.id) }
            )
        }
    }
}`;

interface SampleTask {
  id: number;
  title: string;
  tag: string;
  done: boolean;
}

const INITIAL_SAMPLE_TASKS: SampleTask[] = [
  { id: 1, title: 'Room DAO local persistence', tag: 'Room DB', done: true },
  { id: 2, title: 'Material 3 Jetpack Compose UI', tag: 'Compose', done: true },
  { id: 3, title: 'ViewModel StateFlow sync', tag: 'MVVM', done: false },
];

const PARTICLES = [
  { id: 'p1', top: '12%', left: '16%', size: 4, delay: 0, duration: 5.2, lime: true },
  { id: 'p2', top: '20%', right: '14%', size: 3, delay: 0.8, duration: 6.1, lime: false },
  { id: 'p3', bottom: '24%', left: '10%', size: 4, delay: 1.3, duration: 5.8, lime: true },
  { id: 'p4', bottom: '20%', right: '10%', size: 3, delay: 0.4, duration: 6.4, lime: true },
  { id: 'p5', top: '54%', left: '4%', size: 3, delay: 1.9, duration: 5.5, lime: false },
];

export function HeroSmartphone3D() {
  const [deviceTab, setDeviceTab] = useState<'android' | 'ui' | 'code'>('android');
  const [sampleTasks, setSampleTasks] = useState<SampleTask[]>(INITIAL_SAMPLE_TASKS);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 20 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleSampleTask = (id: number) => {
    setSampleTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex w-full max-w-[460px] flex-col items-center justify-center py-6 sm:py-8"
      style={{ perspective: 1200 }}
    >
      {/* Dramatic Lime Radial Backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-72 w-72 rounded-full bg-[#A8FF2A]/16 blur-[80px]"
      />

      {/* Tilted Futuristic Orbital Ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div
          style={{ transform: 'rotateX(68deg) rotateZ(-14deg)' }}
          className="h-[340px] w-[340px] sm:h-[400px] sm:w-[400px] rounded-full border border-[#A8FF2A]/45 shadow-[0_0_24px_rgba(168,255,42,0.25)]"
        />
      </div>

      {/* Subtle Drifting Micro-Particles */}
      {PARTICLES.map((particle) => (
        <motion.span
          key={particle.id}
          aria-hidden="true"
          style={{
            top: particle.top,
            bottom: particle.bottom,
            left: particle.left,
            right: particle.right,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [-6, 6, -6], opacity: [0.3, 0.95, 0.3] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`pointer-events-none absolute rounded-full ${
            particle.lime
              ? 'bg-[#A8FF2A] shadow-[0_0_12px_rgba(168,255,42,0.8)]'
              : 'bg-[#DDE2E5]/70'
          }`}
        />
      ))}

      {/* Orbiting Floating Tech Discs (Kotlin, Jetpack Compose, Android) */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-2 top-8 sm:left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#111516]/90 shadow-[0_10px_28px_rgba(0,0,0,0.65)] backdrop-blur-md"
      >
        <KotlinLogo className="h-6 w-6" />
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-1 top-14 sm:right-2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#111516]/90 shadow-[0_10px_28px_rgba(0,0,0,0.65)] backdrop-blur-md"
      >
        <ComposeLogo className="h-6 w-6" />
      </motion.div>

      <motion.div
        animate={{ y: [-4, 6, -4] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-16 right-3 sm:right-5 z-20 hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-[#A8FF2A]/35 bg-[#111516]/90 shadow-[0_0_20px_rgba(168,255,42,0.2)] backdrop-blur-md"
      >
        <AndroidBotLogo className="h-5 w-5" />
      </motion.div>

      {/* Main 3D Stage: Android Mascot Accent + Tilted 3D Smartphone */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Stylized 3D Android Emblem peeking beside phone on desktop */}
        <motion.div
          aria-hidden="true"
          animate={{ y: [-5, 4, -5] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:flex -mr-8 mt-6 flex-col items-center opacity-90 drop-shadow-[0_0_32px_rgba(168,255,42,0.35)]"
        >
          <svg viewBox="0 0 120 140" className="h-44 w-36" fill="none">
            <defs>
              <linearGradient id="droidBody" x1="20" y1="15" x2="100" y2="130" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B8FF3B" />
                <stop offset="55%" stopColor="#7AD816" />
                <stop offset="100%" stopColor="#3B7A09" />
              </linearGradient>
            </defs>
            <path d="M40 30L31 15" stroke="#A8FF2A" strokeWidth="4" strokeLinecap="round" />
            <path d="M80 30L89 15" stroke="#A8FF2A" strokeWidth="4" strokeLinecap="round" />
            <path d="M24 58C24 38 40 24 60 24C80 24 96 38 96 58V62H24V58Z" fill="url(#droidBody)" />
            <circle cx="44" cy="45" r="4" fill="#07090B" />
            <circle cx="76" cy="45" r="4" fill="#07090B" />
            <rect x="24" y="66" width="72" height="52" rx="14" fill="url(#droidBody)" />
            <rect x="7" y="66" width="13" height="38" rx="6.5" fill="url(#droidBody)" />
            <rect x="100" y="66" width="13" height="38" rx="6.5" fill="url(#droidBody)" />
          </svg>
        </motion.div>

        {/* Interactive 3D Smartphone */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{ y: [-4, 4, -4] }}
          transition={{
            y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative w-[290px] sm:w-[310px]"
        >
          {/* Side hardware buttons */}
          <div
            aria-hidden="true"
            className="absolute -right-1 top-24 h-12 w-1 rounded-r bg-[#DDE2E5]/30"
          />
          <div
            aria-hidden="true"
            className="absolute -right-1 top-40 h-16 w-1 rounded-r bg-[#DDE2E5]/20"
          />

          {/* Metallic Dark Titanium Chassis */}
          <div className="rounded-[34px] border border-white/25 bg-gradient-to-b from-[#252A2E] via-[#14181A] to-[#0B0E10] p-2.5 shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_36px_rgba(168,255,42,0.18)]">
            <div className="rounded-[26px] border border-white/10 bg-[#07090B] p-4">
              {/* Top status bar */}
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="font-mono text-[10px] text-[#DDE2E5]/70">9:41</span>
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full border border-white/20 bg-[#111516]"
                />
                <span className="font-mono text-[10px] text-[#A8FF2A]">5G</span>
              </div>

              {/* Screen Mode Switcher */}
              <div className="flex items-center justify-between gap-1 rounded-lg border border-white/10 bg-[#111516] p-1">
                <button
                  type="button"
                  onClick={() => setDeviceTab('android')}
                  className={`flex-1 rounded-md py-1 text-[11px] font-medium transition-colors ${
                    deviceTab === 'android'
                      ? 'bg-[#A8FF2A] text-[#07090B] font-semibold'
                      : 'text-[#DDE2E5]/70 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceTab('ui')}
                  className={`flex-1 rounded-md py-1 text-[11px] font-medium transition-colors ${
                    deviceTab === 'ui'
                      ? 'bg-[#A8FF2A] text-[#07090B] font-semibold'
                      : 'text-[#DDE2E5]/70 hover:text-white'
                  }`}
                >
                  Compose
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceTab('code')}
                  className={`inline-flex flex-1 items-center justify-center gap-1 rounded-md py-1 text-[11px] font-medium transition-colors ${
                    deviceTab === 'code'
                      ? 'bg-[#A8FF2A] text-[#07090B] font-semibold'
                      : 'text-[#DDE2E5]/70 hover:text-white'
                  }`}
                >
                  <Code2 className="h-3 w-3" />
                  <span>Kotlin</span>
                </button>
              </div>

              {deviceTab === 'android' && (
                <div className="my-5 flex flex-col items-center justify-center text-center py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A8FF2A]/30 bg-[#111516] shadow-[0_0_28px_rgba(168,255,42,0.2)]">
                    <AndroidBotLogo className="h-9 w-9" />
                  </div>
                  <p className="mt-4 font-display text-lg font-bold leading-tight text-white">
                    Android
                    <br />
                    Developer
                  </p>
                  <p className="mt-2 font-mono text-xs text-[#A8FF2A]">&lt;/&gt;</p>
                  <p className="mt-3 text-[11px] text-[#DDE2E5]/65">
                    Kotlin · Jetpack Compose · Material 3
                  </p>
                </div>
              )}

              {deviceTab === 'ui' && (
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Smartphone className="h-3.5 w-3.5 text-[#A8FF2A]" />
                      <span className="font-display text-xs font-semibold text-white">
                        Live Compose Preview
                      </span>
                    </div>
                    <span className="font-mono text-[11px] tabular-nums text-[#A8FF2A]">
                      {sampleTasks.filter((t) => t.done).length}/{sampleTasks.length}
                    </span>
                  </div>

                  <div className="divide-y divide-white/8 rounded-xl border border-white/10 bg-[#111516]">
                    {sampleTasks.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleSampleTask(task.id)}
                        className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            task.done
                              ? 'border-[#A8FF2A] bg-[#A8FF2A] text-[#07090B]'
                              : 'border-[#DDE2E5]/40'
                          }`}
                        >
                          {task.done && <Check className="h-3 w-3 stroke-[2.5]" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-xs font-medium ${
                              task.done ? 'text-[#DDE2E5]/45 line-through' : 'text-white'
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-[10px] text-[#DDE2E5]/55">{task.tag}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {deviceTab === 'code' && (
                <div className="mt-4">
                  <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#111516] p-3 font-mono text-[10.5px] leading-[1.5] text-[#DDE2E5]">
                    <code>{HERO_KOTLIN_SNIPPET}</code>
                  </pre>
                </div>
              )}

              <div className="mt-4 flex justify-center">
                <span
                  aria-hidden="true"
                  className="h-1 w-20 rounded-full bg-[#DDE2E5]/25"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Glowing Lime Pedestal Platform */}
      <div
        aria-hidden="true"
        className="relative -mt-3 h-5 w-56 rounded-full border border-[#A8FF2A]/50 bg-gradient-to-b from-[#A8FF2A]/25 to-[#07090B] shadow-[0_0_32px_rgba(168,255,42,0.35)]"
      />
    </div>
  );
}
