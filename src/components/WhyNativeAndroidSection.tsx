import { Cpu, Layers, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const NATIVE_PILLARS = [
  {
    index: '01',
    title: 'Direct Runtime Performance',
    icon: Cpu,
    summary:
      'Compiling directly to Android Runtime (ART) eliminates cross-platform bridge overhead, delivering predictable 60–120fps frame pacing, faster cold starts, and leaner battery and memory usage.',
    focus: 'ART Bytecode · Kotlin Coroutines · Lazy Compose Lists',
  },
  {
    index: '02',
    title: 'First-Class Platform Capabilities',
    icon: Smartphone,
    summary:
      'Building natively provides immediate access to the latest Android SDK APIs—from Material You dynamic color and predictive back gestures to Room SQLite persistence and Firebase Cloud Messaging.',
    focus: 'Android SDK · Room Database · Edge-to-Edge System UI',
  },
  {
    index: '03',
    title: 'Authentic Native User Experience',
    icon: Sparkles,
    summary:
      'Users notice when an app feels native. Standard Material Design 3 physics, adaptive typography, haptics, and system accessibility services create interfaces that belong on Android hardware.',
    focus: 'Material Design 3 · Adaptive Layouts · Native Gestures',
  },
  {
    index: '04',
    title: 'Modern Kotlin & Jetpack Compose',
    icon: Layers,
    summary:
      'Kotlin null-safety paired with declarative Jetpack Compose and MVVM architecture reduces UI boilerplate, isolates state cleanly via ViewModel and StateFlow, and keeps codebases scalable.',
    focus: 'Kotlin · Jetpack Compose · MVVM & Unidirectional State',
  },
];

export function WhyNativeAndroidSection() {
  return (
    <section id="why-native" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-48px' }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#A8FF2A]">Engineering Philosophy</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why Native Android?
            </h2>
          </div>

          <p className="text-[15px] leading-[1.7] text-[#DDE2E5]/75 lg:col-span-5">
            Focusing deeply on native Android lets me build fast, platform-specific applications
            that respect device constraints, adopt modern Android capabilities early, and feel
            effortless in daily use.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {NATIVE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-2xl border border-[#DDE2E5]/10 bg-[#111516] p-6 sm:p-7 transition-colors hover:border-[#A8FF2A]/45"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#DDE2E5]/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2E5]/15 bg-[#07090B] text-[#A8FF2A]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-xs tabular-nums text-[#DDE2E5]/55">
                        {pillar.index}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-[#DDE2E5]/65">
                      Native Advantage
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-[#DDE2E5]/75">
                    {pillar.summary}
                  </p>
                </div>

                <p className="mt-6 border-t border-[#DDE2E5]/10 pt-4 font-mono text-xs text-[#DDE2E5]">
                  {pillar.focus}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
