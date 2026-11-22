import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { EDUCATION, EXPERIENCE } from '../data/portfolio';
import { SectionDivider } from './SectionDivider';
import { SectionReveal } from './SectionReveal';

export function ExperienceEducationSection() {
  return (
    <>
      <section id="experience" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="max-w-2xl">
            <p className="text-xs font-medium text-[#A8FF2A]">Experience</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Professional Experience
            </h2>
            <p className="mt-3 text-[15px] text-[#DDE2E5]/75">
              Industry internship experience building production web interfaces, reusable UI
              components, and collaborative Git workflows.
            </p>
          </SectionReveal>

          <div className="mt-10 space-y-6">
            {EXPERIENCE.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#DDE2E5]/10 bg-[#111516] p-6 sm:p-8"
              >
                <div className="flex flex-col gap-3 border-b border-[#DDE2E5]/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DDE2E5]/15 bg-[#07090B] text-[#A8FF2A]">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {item.role}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-[#DDE2E5]">
                        {item.company}
                        <span className="mx-2 text-[#DDE2E5]/30" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-[#DDE2E5]/70">{item.domainNote}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-medium text-[#DDE2E5]/70 sm:text-right">
                    <p className="font-mono tabular-nums text-white">{item.period}</p>
                    <p className="mt-1">{item.location}</p>
                  </div>
                </div>

                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {item.responsibilities.map((resp) => (
                    <li
                      key={resp}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#DDE2E5]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#A8FF2A]" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="education" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="max-w-2xl">
            <p className="text-xs font-medium text-[#A8FF2A]">Academic Background</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Education
            </h2>
          </SectionReveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {EDUCATION.map((edu, idx) => (
              <motion.article
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-2xl border border-[#DDE2E5]/10 bg-[#111516] p-6 sm:p-7 transition-colors hover:border-[#A8FF2A]/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DDE2E5]/15 bg-[#07090B] text-[#A8FF2A]">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs tabular-nums text-[#DDE2E5]/70">
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#A8FF2A]">{edu.field}</p>
                  <p className="mt-3 text-sm text-[#DDE2E5]">{edu.institution}</p>
                  {edu.university && (
                    <p className="mt-1 text-xs text-[#DDE2E5]/65">{edu.university}</p>
                  )}
                </div>

                <div className="mt-5 border-t border-[#DDE2E5]/10 pt-4 text-xs text-[#DDE2E5]/55">
                  {edu.location}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
