import { ArrowDownToLine, ExternalLink, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';

/**
 * ResumeSection — Open & Download Resume Actions
 *
 * HOW TO SWAP YOUR RESUME PDF (Zero Code Changes):
 * 1. Replace `public/resume.pdf` in this repository with your updated PDF (keep the exact filename `resume.pdf`).
 * 2. Vite automatically copies everything inside `public/` to the root of `dist/` during `npm run build`,
 *    so `/resume.pdf` stays up to date in both local development (`server.ts`) and production static hosting.
 *
 * OPTIONAL CUSTOM FILENAME OR EXTERNAL LINK (e.g. Google Drive / GitHub Release):
 * - Update `resumePdfPath` and `resumeDownloadPath` inside `src/data/portfolio.ts` (`PERSONAL_INFO`),
 *   and update the `download="..."` filename attribute on the download links in `ResumeSection.tsx` and `HeroSection.tsx`.
 *
 * HOSTING & UPDATING ON VERCEL:
 * 1. Push your repository (including `public/resume.pdf`) to GitHub and import the project in Vercel
 *    using the Vite preset (`Build Command: npm run build`, `Output Directory: dist`).
 * 2. Vercel serves `public/resume.pdf` directly as a static edge asset at `https://<your-domain>/resume.pdf`.
 * 3. Whenever you update your resume, replace `public/resume.pdf` and `git push` (or run `vercel --prod`) —
 *    Vercel will automatically rebuild and serve the updated PDF globally with zero backend config.
 */
export function ResumeSection() {
  return (
    <section id="resume" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#111516] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#A8FF2A]">Curriculum Vitae</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Resume
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#DDE2E5]/75">
                Open or download the official PDF resume for {PERSONAL_INFO.name} covering Android
                projects, internship experience, technical stack, and education.
              </p>
              <div className="mt-4 space-y-1.5">
                <p className="inline-flex items-center gap-2 font-mono text-xs text-[#DDE2E5]/65">
                  <FileText className="h-3.5 w-3.5 text-[#A8FF2A]" />
                  <span>Om_Soni_Android_Developer_Resume.pdf · PDF</span>
                </p>
                <p className="text-xs text-[#DDE2E5]/50">
                  Served statically from <code className="font-mono text-[#DDE2E5]/75">public/resume.pdf</code>{' '}
                  — swap that file and push to auto-update on Vercel.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={PERSONAL_INFO.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-[#07090B] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:border-[#A8FF2A]/60"
              >
                <ExternalLink className="h-4 w-4 text-[#A8FF2A]" />
                <span>Open Resume</span>
              </a>

              <a
                href={PERSONAL_INFO.resumeDownloadPath}
                download="Om_Soni_Android_Developer_Resume.pdf"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#A8FF2A] px-5 py-2.5 text-xs font-semibold text-[#07090B] whitespace-nowrap shrink-0 transition-colors hover:bg-[#99f21a]"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
