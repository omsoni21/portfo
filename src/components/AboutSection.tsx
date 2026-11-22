import { PERSONAL_INFO } from '../data/portfolio';

const PROFILE_ROWS = [
  { label: 'Specialization', value: 'Native Android Development' },
  { label: 'Core Language & UI', value: 'Kotlin & Jetpack Compose' },
  { label: 'Architecture Pattern', value: 'MVVM & Repository Pattern' },
  { label: 'Education', value: 'B.Tech in Computer Science Engineering' },
  { label: 'Engineering Priorities', value: 'Clean Code, Scalability & UI Clarity' },
  { label: 'Languages Spoken', value: PERSONAL_INFO.languagesKnown.join(' · ') },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#A8FF2A]">Profile</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              About Me
            </h2>
            <p className="mt-6 text-[15px] sm:text-base leading-[1.75] text-[#DDE2E5]">
              {PERSONAL_INFO.aboutDescription}
            </p>
            <p className="mt-4 text-[15px] sm:text-base leading-[1.75] text-[#DDE2E5]/70">
              With a foundation in Computer Science Engineering and practical experience building
              responsive applications, I prioritize clean state management with Kotlin Coroutines,
              offline-first persistence using Room Database, and expressive interfaces built with
              Material Design 3.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-[#111516] p-6 sm:p-7">
              <h3 className="font-display text-base font-semibold text-white">
                Engineering Snapshot
              </h3>
              <dl className="mt-5 divide-y divide-white/8">
                {PROFILE_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <dt className="text-xs font-medium text-[#DDE2E5]/55 shrink-0">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-medium text-white sm:text-right">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
