import express, { type Request, type Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const GITHUB_USERNAME = 'omsoni21';
const RESUME_FILE_PATH = path.resolve(process.cwd(), 'public/resume.pdf');

interface GitHubCacheEntry {
  expiresAt: number;
  payload: unknown;
}

interface RawGitHubRepo {
  id: number;
  name?: string;
  description?: string | null;
  html_url?: string;
  homepage?: string | null;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  topics?: string[];
  fork?: boolean;
}

let githubCache: GitHubCacheEntry | null = null;

function isAndroidRepository(repo: RawGitHubRepo): boolean {
  const language = String(repo.language ?? '').toLowerCase();
  const name = String(repo.name ?? '').toLowerCase();
  const description = String(repo.description ?? '').toLowerCase();
  const topics = Array.isArray(repo.topics)
    ? repo.topics.map((t) => String(t).toLowerCase())
    : [];

  if (language === 'kotlin' || language === 'java') {
    return true;
  }

  const androidKeywords = [
    'android',
    'kotlin',
    'jetpack',
    'compose',
    'material',
    'room',
    'taskflow',
    'freshkart',
    'apk',
    'mvvm',
  ];

  if (topics.some((topic) => androidKeywords.some((kw) => topic.includes(kw)))) {
    return true;
  }

  return androidKeywords.some(
    (kw) => name.includes(kw) || description.includes(kw)
  );
}

function mapRepo(repo: RawGitHubRepo) {
  return {
    id: repo.id,
    name: String(repo.name ?? ''),
    description: repo.description ? String(repo.description) : null,
    htmlUrl: String(repo.html_url ?? ''),
    homepage: repo.homepage ? String(repo.homepage) : null,
    language: repo.language ? String(repo.language) : null,
    stars: Number(repo.stargazers_count ?? 0),
    forks: Number(repo.forks_count ?? 0),
    updatedAt: String(repo.updated_at ?? ''),
    topics: Array.isArray(repo.topics)
      ? repo.topics.slice(0, 5).map(String)
      : [],
  };
}

async function fetchGitHubActivity() {
  const now = Date.now();
  if (githubCache && githubCache.expiresAt > now) {
    return githubCache.payload;
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'omsoni21-portfolio',
  };

  if (process.env.GITHUB_TOKEN?.trim()) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN.trim()}`;
  }

  const [profileRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      signal: AbortSignal.timeout(6000),
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers,
        signal: AbortSignal.timeout(6000),
      }
    ),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers,
        signal: AbortSignal.timeout(6000),
      }
    ),
  ]);

  if (!profileRes.ok || !reposRes.ok) {
    return {
      available: false,
      reason:
        profileRes.status === 403
          ? 'GitHub API rate limit reached temporarily.'
          : 'Unable to reach GitHub API right now.',
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
    };
  }

  const profileJson = await profileRes.json();
  const reposJson = await reposRes.json();
  const eventsJson = eventsRes.ok ? await eventsRes.json() : [];

  const ownRepos: RawGitHubRepo[] = Array.isArray(reposJson)
    ? reposJson.filter((repo) => !repo.fork)
    : [];

  const repositories = ownRepos.slice(0, 6).map(mapRepo);
  const androidRepositories = ownRepos.filter(isAndroidRepository).map(mapRepo);

  const languageCounts = new Map<string, number>();
  for (const repo of ownRepos) {
    if (repo?.language) {
      const lang = String(repo.language);
      languageCounts.set(lang, (languageCounts.get(lang) ?? 0) + 1);
    }
  }

  const languages = Array.from(languageCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const recentEvents = Array.isArray(eventsJson)
    ? eventsJson.slice(0, 5).map((event) => ({
        id: String(event.id ?? ''),
        type: String(event.type ?? ''),
        repoName: String(event.repo?.name ?? ''),
        createdAt: String(event.created_at ?? ''),
      }))
    : [];

  const payload = {
    available: true,
    fetchedAt: new Date().toISOString(),
    profile: {
      login: String(profileJson.login ?? GITHUB_USERNAME),
      name: String(profileJson.name ?? 'Om Soni'),
      bio: profileJson.bio ? String(profileJson.bio) : null,
      avatarUrl: String(profileJson.avatar_url ?? ''),
      htmlUrl: String(
        profileJson.html_url ?? `https://github.com/${GITHUB_USERNAME}`
      ),
      publicRepos: Number(profileJson.public_repos ?? 0),
      followers: Number(profileJson.followers ?? 0),
      following: Number(profileJson.following ?? 0),
      location: profileJson.location ? String(profileJson.location) : null,
    },
    repositories,
    androidRepositories,
    languages,
    recentEvents,
  };

  githubCache = {
    expiresAt: now + 10 * 60 * 1000,
    payload,
  };

  return payload;
}

interface ServerProjectSeoEntry {
  id: string;
  title: string;
  category: 'android' | 'web';
  description: string;
  technologies: string[];
  githubUrl?: string;
  apkUrl?: string;
}

const CURATED_PROJECT_SEO: ServerProjectSeoEntry[] = [
  {
    id: 'taskflow',
    title: 'Taskflow',
    category: 'android',
    description:
      'A modern Android task management app by Om Soni built with Kotlin, Jetpack Compose, Material Design 3, and offline-first Room Database.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material Design 3', 'Room Database'],
    githubUrl: 'https://github.com/omsoni21/Taskflow',
    apkUrl: 'https://github.com/omsoni21/Taskflow/raw/main/Taskflow-v1.0.apk',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker Android App',
    category: 'android',
    description:
      'Daily expense and income tracking Android application built by Om Soni using Kotlin, Jetpack Compose, Room Database, and MVVM architecture.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material Design 3', 'Room Database', 'MVVM'],
  },
  {
    id: 'freshkart',
    title: 'FreshKart',
    category: 'android',
    description:
      'Grocery shopping Android app concept by Om Soni featuring customer ordering and seller inventory workflows in Kotlin and Jetpack Compose.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase'],
  },
  {
    id: 'railspace-lease',
    title: 'Railspace Lease Management System',
    category: 'web',
    description:
      'Structured railway lease workflow portal built by Om Soni with Next.js, React.js, Tailwind CSS, and REST API integrations.',
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'alumni-platform',
    title: 'Alumni Association Platform',
    category: 'web',
    description:
      'Full-stack alumni networking platform built by Om Soni featuring user authentication, MongoDB data handling, and responsive design.',
    technologies: ['JavaScript', 'MongoDB', 'Authentication', 'Responsive UI'],
  },
];

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getBaseOrigin(req: Request): string {
  const configured = process.env.APP_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }
  const host = req.get('host') || `localhost:${PORT}`;
  return `${req.protocol}://${host}`;
}

function buildSeoHeadTags(reqPath: string, origin: string) {
  const portraitUrl = `${origin}/assets/aistudio/im1_39ca8dd6.png`;
  const siteName = 'Om Soni — Android Developer Portfolio';

  if (reqPath.startsWith('/projects/')) {
    const slug = decodeURIComponent(reqPath.replace(/^\/projects\//, '').split('/')[0] || '').toLowerCase();
    const cachedData = githubCache?.payload as
      | { androidRepositories?: ReturnType<typeof mapRepo>[] }
      | undefined;

    const curatedMatch = CURATED_PROJECT_SEO.find((p) => p.id.toLowerCase() === slug);
    const githubMatch = cachedData?.androidRepositories?.find((repo) => {
      const repoSlug = `github-${repo.id}`;
      return (
        repoSlug.toLowerCase() === slug ||
        repo.name.toLowerCase() === slug ||
        repo.name.toLowerCase().replace(/[^a-z0-9]/g, '') === slug.replace(/[^a-z0-9]/g, '')
      );
    });

    const project: ServerProjectSeoEntry | null = curatedMatch
      ? curatedMatch
      : githubMatch
      ? {
          id: slug,
          title: githubMatch.name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          category: 'android',
          description:
            githubMatch.description?.trim() ||
            `Open-source ${githubMatch.language || 'Kotlin'} Android application by Om Soni on GitHub.`,
          technologies: [
            githubMatch.language || 'Kotlin',
            ...githubMatch.topics.slice(0, 3),
            'Android SDK',
          ],
          githubUrl: githubMatch.htmlUrl,
        }
      : null;

    if (project) {
      const rawTitle = `${project.title} — ${
        project.category === 'android' ? 'Android App' : 'Web App'
      } by Om Soni`;
      const title = rawTitle.length <= 60 ? rawTitle : `${project.title} — Om Soni Portfolio`;
      const desc =
        project.description.length > 158
          ? `${project.description.slice(0, 155).trimEnd()}...`
          : project.description;
      const canonicalUrl = `${origin}/projects/${encodeURIComponent(slug)}`;

      const projectImageMap: Record<string, string> = {
        taskflow: `${origin}/assets/projects/taskflow.jpg`,
        'expense-tracker': `${origin}/assets/projects/expense-tracker.jpg`,
        freshkart: `${origin}/assets/projects/freshkart.jpg`,
        'railspace-lease': `${origin}/assets/projects/railspace-lease.jpg`,
        'alumni-platform': `${origin}/assets/projects/alumni-platform.jpg`,
        habitflow: `${origin}/assets/projects/habitflow.jpg`,
        fitnesstracker: `${origin}/assets/projects/fitnesstracker.jpg`,
      };
      const normalizedKey = project.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const projectImage =
        projectImageMap[slug] ||
        projectImageMap[normalizedKey] ||
        portraitUrl;

      return {
        title,
        description: desc,
        type: 'article',
        url: canonicalUrl,
        imageUrl: projectImage,
        siteName,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: project.title,
          applicationCategory:
            project.category === 'android' ? 'MobileApplication' : 'WebApplication',
          operatingSystem: project.category === 'android' ? 'Android' : 'Web',
          description: desc,
          url: canonicalUrl,
          codeRepository: project.githubUrl,
          downloadUrl: project.apkUrl,
          author: {
            '@type': 'Person',
            name: 'Om Soni',
            url: `${origin}/`,
          },
          keywords: project.technologies.join(', '),
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      };
    }
  }

  if (reqPath === '/about' || reqPath === '/bio') {
    const bioDesc =
      'Computer Science Engineering graduate and Native Android Developer specializing in Kotlin, Jetpack Compose, Material Design 3, and MVVM architecture.';
    const bioUrl = `${origin}${reqPath}`;
    return {
      title: 'Om Soni — Professional Bio & Android Experience',
      description: bioDesc,
      type: 'profile',
      url: bioUrl,
      imageUrl: portraitUrl,
      siteName,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: 'Om Soni',
          jobTitle: 'Android Developer',
          description: bioDesc,
          url: bioUrl,
          image: portraitUrl,
          sameAs: [
            'https://github.com/omsoni21',
            'https://linkedin.com/in/om-soni-57a424256',
          ],
        },
      },
    };
  }

  const defaultDesc =
    'Native Android Developer portfolio for Om Soni specializing in Kotlin, Jetpack Compose, Material Design 3, and modern MVVM architecture.';
  return {
    title: siteName,
    description: defaultDesc,
    type: 'profile',
    url: `${origin}/`,
    imageUrl: portraitUrl,
    siteName,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Om Soni',
      jobTitle: 'Android Developer',
      description: defaultDesc,
      url: `${origin}/`,
      image: portraitUrl,
      email: 'somofficial9661@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhopal',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Sagar Institute of Science & Technology (SISTec GN)',
      },
      knowsAbout: [
        'Kotlin',
        'Jetpack Compose',
        'Android SDK',
        'Material Design 3',
        'Room Database',
        'MVVM Architecture',
      ],
      sameAs: [
        'https://github.com/omsoni21',
        'https://linkedin.com/in/om-soni-57a424256',
      ],
    },
  };
}

function injectSeoIntoHtml(html: string, reqPath: string, origin: string): string {
  const seo = buildSeoHeadTags(reqPath, origin);
  const safeTitle = escapeHtmlAttr(seo.title);
  const safeDesc = escapeHtmlAttr(seo.description);
  const safeUrl = escapeHtmlAttr(seo.url);
  const safeImg = escapeHtmlAttr(seo.imageUrl);
  const safeSite = escapeHtmlAttr(seo.siteName);
  const safeJsonLd = JSON.stringify(seo.jsonLd);

  let updated = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/i,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:type"[\s\S]*?\/>/i,
      `<meta property="og:type" content="${seo.type}" />`
    )
    .replace(
      /<meta\s+property="og:site_name"[\s\S]*?\/>/i,
      `<meta property="og:site_name" content="${safeSite}" />`
    )
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/i,
      `<meta property="og:image" content="${safeImg}" />\n    <meta property="og:url" content="${safeUrl}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/i,
      `<meta name="twitter:image" content="${safeImg}" />`
    )
    .replace(
      /<script\s+id="dynamic-seo-jsonld"[^>]*>[\s\S]*?<\/script>/i,
      `<link rel="canonical" href="${safeUrl}" />\n    <script id="dynamic-seo-jsonld" type="application/ld+json">${safeJsonLd}</script>`
    );

  return updated;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);

  app.get('/resume.pdf', async (req: Request, res: Response) => {
    try {
      await fs.access(RESUME_FILE_PATH);
      res.setHeader('Content-Type', 'application/pdf');
      if (req.query.download === '1') {
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="Om_Soni_Android_Developer_Resume.pdf"'
        );
      } else {
        res.setHeader(
          'Content-Disposition',
          'inline; filename="Om_Soni_Android_Developer_Resume.pdf"'
        );
      }
      res.sendFile(RESUME_FILE_PATH);
    } catch {
      res.status(404).json({ error: 'Resume PDF not found.' });
    }
  });

  app.get('/api/github', async (_req: Request, res: Response) => {
    try {
      const data = await fetchGitHubActivity();
      res.json(data);
    } catch {
      res.status(200).json({
        available: false,
        reason: 'Could not connect to GitHub API.',
        profileUrl: `https://github.com/${GITHUB_USERNAME}`,
      });
    }
  });

  app.get('/robots.txt', (req: Request, res: Response) => {
    const origin = getBaseOrigin(req);
    res.type('text/plain').send(
      `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    );
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const origin = getBaseOrigin(req);
    const staticPaths = [
      '/',
      '/about',
      ...CURATED_PROJECT_SEO.map((p) => `/projects/${p.id}`),
    ];
    const urls = staticPaths
      .map(
        (p) =>
          `  <url>\n    <loc>${escapeHtmlAttr(`${origin}${p}`)}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`
      )
      .join('\n');

    res
      .type('application/xml')
      .send(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
      );
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.get(['/', '/about', '/bio', '/projects/:slug'], async (req: Request, res: Response, next) => {
      try {
        const templatePath = path.resolve(process.cwd(), 'index.html');
        const rawHtml = await fs.readFile(templatePath, 'utf-8');
        const origin = getBaseOrigin(req);
        const withSeo = injectSeoIntoHtml(rawHtml, req.path, origin);
        const transformed = await vite.transformIndexHtml(req.originalUrl, withSeo);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(transformed);
      } catch (err) {
        next(err);
      }
    });

    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', async (req: Request, res: Response) => {
      try {
        const rawHtml = await fs.readFile(
          path.resolve(distDir, 'index.html'),
          'utf-8'
        );
        const origin = getBaseOrigin(req);
        const withSeo = injectSeoIntoHtml(rawHtml, req.path, origin);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(withSeo);
      } catch {
        res.sendFile(path.resolve(distDir, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
  });
}

startServer();
