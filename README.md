# Om Soni — Native Android Developer Portfolio

A full-stack, responsive developer portfolio built for **Om Soni** specializing in Native Android Development with **Kotlin**, **Jetpack Compose**, **Material Design 3**, and **MVVM Architecture**.

## Project Structure

- `server.ts` — Express server mounting Vite middleware in development, serving `/resume.pdf` directly from the official PDF, and proxying live public GitHub activity at `/api/github`.
- `src/data/portfolio.ts` — Centralized data module for personal branding, projects, skills, experience, education, and optional Formspree endpoint (`formspreeEndpoint`).
- `src/types/portfolio.ts` — TypeScript definitions for all portfolio entities.
- `src/components/` — Modular UI sections (`Navbar`, `HeroSection`, `AboutSection`, `WhyNativeAndroidSection`, `SkillsSection`, `ProjectsSection`, `ProjectCard`, `ProjectVisualPreview`, `ExperienceEducationSection`, `GitHubActivitySection`, `ResumeSection`, `ContactSection`, `Footer`).
- `public/assets/aistudio/` — Stores the official resume PDF served at `/resume.pdf` and studio portrait.

## Local Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run locally (port 3000):
   ```bash
   npm run dev
   ```
3. Type-check and build for production:
   ```bash
   npm run lint
   npm run build
   npm start
   ```

## Updating Projects & Screenshots

1. Open `src/data/portfolio.ts`.
2. Append a new `ProjectItem` object to the `PROJECTS` array (`id`, `title`, `category`, `platformLabel`, `status`, `description`, `technologies`, `highlights`, and optional `githubUrl`, `apkUrl`, `liveUrl`, `screenshotPath`).
3. Place screenshot files inside `public/screenshots/` and reference them via `screenshotPath: '/screenshots/my-app.png'`.

## Zero-Cost Contact Setup (Formspree + `mailto:`)

No custom contact backend is required:
- By default, the contact form builds a pre-filled `mailto:` email draft to `somofficial9661@gmail.com`.
- To receive web form submissions directly in your inbox for free, create a form at [formspree.io](https://formspree.io) and paste your endpoint (`https://formspree.io/f/xxxxxxxx`) into `formspreeEndpoint` in `src/data/portfolio.ts` (or set `VITE_FORMSPREE_ENDPOINT`).

## Environment Variables

Optional variables (none are required to run):
- `VITE_FORMSPREE_ENDPOINT` *(optional)* — Free Formspree endpoint URL for direct web form submissions.
- `GITHUB_TOKEN` *(optional)* — GitHub personal access token for higher GitHub API rate limits.

## Production & Vercel / Cloud Deployment

- Build command: `npm run build`
- Start command: `npm start`
- If deploying to Vercel as a static + serverless site, configure `/api/contact` and `/api/github` as Vercel Serverless Functions or deploy the Express server (`server.ts`) directly on a Node.js host (Cloud Run, Render, Railway, or Fly.io) on port `3000`.
