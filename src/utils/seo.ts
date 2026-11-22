import { PERSONAL_INFO } from '../data/portfolio';
import type { ProjectItem } from '../types/portfolio';

export interface SeoMetadataPayload {
  title: string;
  description: string;
  url: string;
  type: 'website' | 'profile' | 'article';
  imageUrl: string;
  jsonLd: Record<string, unknown>;
}

function upsertMetaTag(
  attr: 'name' | 'property',
  key: string,
  content: string
) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function upsertJsonLd(data: Record<string, unknown>) {
  let script = document.head.querySelector<HTMLScriptElement>(
    'script#dynamic-seo-jsonld'
  );
  if (!script) {
    script = document.createElement('script');
    script.id = 'dynamic-seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function buildDescription(raw: string, fallbackSuffix: string): string {
  const clean = raw.replace(/\s+/g, ' ').trim();
  const combined = clean.length >= 110 ? clean : `${clean} ${fallbackSuffix}`.trim();
  if (combined.length <= 158) return combined;
  return `${combined.slice(0, 155).trimEnd()}...`;
}

export function getBioSeoMetadata(): SeoMetadataPayload {
  const origin = window.location.origin;
  return {
    title: 'Om Soni — Android Developer Portfolio',
    description:
      'Native Android Developer portfolio for Om Soni specializing in Kotlin, Jetpack Compose, Material Design 3, and modern MVVM architecture.',
    url: `${origin}/`,
    type: 'profile',
    imageUrl: `${origin}${PERSONAL_INFO.portraitPath}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      jobTitle: 'Android Developer',
      description: PERSONAL_INFO.aboutDescription,
      url: `${origin}/`,
      image: `${origin}${PERSONAL_INFO.portraitPath}`,
      email: PERSONAL_INFO.email,
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
      sameAs: [PERSONAL_INFO.githubUrl, PERSONAL_INFO.linkedinUrl],
    },
  };
}

export function getProjectSeoMetadata(project: ProjectItem): SeoMetadataPayload {
  const origin = window.location.origin;
  const projectUrl = `${origin}/projects/${encodeURIComponent(project.id)}`;
  const rawTitle = `${project.title} — ${
    project.category === 'android' ? 'Android App' : 'Web App'
  } by Om Soni`;
  const title =
    rawTitle.length <= 60 ? rawTitle : `${project.title} — Om Soni Portfolio`;

  const description = buildDescription(
    project.description,
    `Built with ${project.technologies.slice(0, 3).join(', ')}.`
  );

  const imageUrl = project.screenshotPath
    ? `${origin}${project.screenshotPath}`
    : `${origin}${PERSONAL_INFO.portraitPath}`;

  return {
    title,
    description,
    url: projectUrl,
    type: 'article',
    imageUrl,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.title,
      applicationCategory:
        project.category === 'android'
          ? 'MobileApplication'
          : 'WebApplication',
      operatingSystem: project.category === 'android' ? 'Android' : 'Web',
      description,
      url: projectUrl,
      codeRepository: project.githubUrl,
      downloadUrl: project.apkUrl,
      author: {
        '@type': 'Person',
        name: PERSONAL_INFO.name,
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

export function applySeoMetadata(meta: SeoMetadataPayload) {
  document.title = meta.title;
  upsertMetaTag('name', 'description', meta.description);
  upsertMetaTag('property', 'og:type', meta.type);
  upsertMetaTag('property', 'og:title', meta.title);
  upsertMetaTag('property', 'og:description', meta.description);
  upsertMetaTag('property', 'og:url', meta.url);
  upsertMetaTag('property', 'og:image', meta.imageUrl);
  upsertMetaTag(
    'property',
    'og:site_name',
    'Om Soni — Android Developer Portfolio'
  );
  upsertMetaTag('name', 'twitter:card', 'summary_large_image');
  upsertMetaTag('name', 'twitter:title', meta.title);
  upsertMetaTag('name', 'twitter:description', meta.description);
  upsertMetaTag('name', 'twitter:image', meta.imageUrl);
  upsertCanonical(meta.url);
  upsertJsonLd(meta.jsonLd);
}
