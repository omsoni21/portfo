import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { PERSONAL_INFO } from '../data/portfolio';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: 'Android Developer Opportunity',
  message: '',
  _gotcha: '',
};

const PRESET_SUBJECTS = [
  'Android Developer Opportunity',
  'Kotlin & Jetpack Compose Project',
  'Internship / Full-Time Role',
];

function buildDraftParts(form: FormState) {
  const subject = form.subject.trim() || 'Android Developer Portfolio Inquiry';
  const bodyLines = [
    form.name.trim() ? `Name: ${form.name.trim()}` : '',
    form.email.trim() ? `Reply-To: ${form.email.trim()}` : '',
    '',
    form.message.trim(),
  ].filter((line, index, arr) => line !== '' || (index > 0 && arr[index - 1] !== ''));

  return {
    subject,
    body: bodyLines.join('\n'),
  };
}

function buildMailtoUrl(form: FormState): string {
  const { subject, body } = buildDraftParts(form);
  return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildGmailComposeUrl(form: FormState): string {
  const { subject, body } = buildDraftParts(form);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PERSONAL_INFO.email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    mailtoFallback?: string;
    gmailFallback?: string;
    draftText?: string;
  } | null>(null);

  const hasFormspree = Boolean(PERSONAL_INFO.formspreeEndpoint);
  const liveMailtoHref = buildMailtoUrl(form);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyDraft = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      setCopiedDraft(false);
    }
  };

  const triggerMailtoDraft = (href: string) => {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (form.name.trim().length < 2) {
      setStatus({ type: 'error', message: 'Please enter your name (at least 2 characters).' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (form.subject.trim().length < 3) {
      setStatus({ type: 'error', message: 'Please enter a subject (at least 3 characters).' });
      return;
    }

    if (form.message.trim().length < 10) {
      setStatus({
        type: 'error',
        message: 'Please enter a message with at least 10 characters.',
      });
      return;
    }

    if (!hasFormspree) {
      const mailtoHref = buildMailtoUrl(form);
      const gmailHref = buildGmailComposeUrl(form);
      const { subject, body } = buildDraftParts(form);
      const draftText = `To: ${PERSONAL_INFO.email}\nSubject: ${subject}\n\n${body}`;
      triggerMailtoDraft(mailtoHref);
      setStatus({
        type: 'success',
        message:
          'Prepared a pre-filled email draft to somofficial9661@gmail.com. Choose your mail app, Gmail web, or copy the draft below.',
        mailtoFallback: mailtoHref,
        gmailFallback: gmailHref,
        draftText,
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(PERSONAL_INFO.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          _gotcha: form._gotcha,
        }),
      });

      if (!response.ok) {
        const mailtoHref = buildMailtoUrl(form);
        const gmailHref = buildGmailComposeUrl(form);
        const { subject, body } = buildDraftParts(form);
        setStatus({
          type: 'error',
          message:
            'Formspree could not deliver right now. Use the pre-filled email options below instead.',
          mailtoFallback: mailtoHref,
          gmailFallback: gmailHref,
          draftText: `To: ${PERSONAL_INFO.email}\nSubject: ${subject}\n\n${body}`,
        });
      } else {
        setStatus({
          type: 'success',
          message: 'Message sent via Formspree! Om will respond directly via email.',
        });
        setForm(INITIAL_FORM);
      }
    } catch {
      const mailtoHref = buildMailtoUrl(form);
      const gmailHref = buildGmailComposeUrl(form);
      const { subject, body } = buildDraftParts(form);
      setStatus({
        type: 'error',
        message:
          'Network error sending via Formspree. You can open a pre-filled email draft directly below.',
        mailtoFallback: mailtoHref,
        gmailFallback: gmailHref,
        draftText: `To: ${PERSONAL_INFO.email}\nSubject: ${subject}\n\n${body}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#A8FF2A]">Get In Touch</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s Build Something Great Together
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#DDE2E5]/75">
              Open to Native Android Developer roles, Kotlin &amp; Jetpack Compose engineering
              opportunities, and technical discussions.
            </p>

            <div className="mt-8 space-y-4 border-t border-[#DDE2E5]/10 pt-6">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DDE2E5]/10 bg-[#111516] px-4 py-3.5">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                    'Android Developer Opportunity — Om Soni'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-3 text-sm text-white hover:text-[#A8FF2A]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#A8FF2A]" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#DDE2E5]/15 px-2.5 text-xs font-medium text-[#DDE2E5] transition-colors hover:border-[#A8FF2A]/55 hover:text-white shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#A8FF2A]" />
                      <span className="text-[#A8FF2A]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#DDE2E5]/10 bg-[#111516] px-4 py-3.5 text-sm text-white transition-colors hover:border-[#A8FF2A]/50"
              >
                <span className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-[#A8FF2A]" />
                  <span>LinkedIn Profile</span>
                </span>
                <span className="font-mono text-xs text-[#DDE2E5]/55">om-soni-57a424256</span>
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#DDE2E5]/10 bg-[#111516] px-4 py-3.5 text-sm text-white transition-colors hover:border-[#A8FF2A]/50"
              >
                <span className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-[#A8FF2A]" />
                  <span>GitHub Profile</span>
                </span>
                <span className="font-mono text-xs text-[#DDE2E5]/55">github.com/omsoni21</span>
              </a>

              <div className="flex items-center gap-3 px-1 pt-2 text-xs text-[#DDE2E5]/65">
                <MapPin className="h-4 w-4 shrink-0 text-[#DDE2E5]/50" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[#DDE2E5]/10 bg-[#111516] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-white">
                  Send a Message
                </h3>
                <span className="text-xs text-[#DDE2E5]/65">
                  {hasFormspree ? 'Powered by Formspree' : 'Direct Email Draft (Zero Backend)'}
                </span>
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-gotcha">Leave empty</label>
                <input
                  id="contact-gotcha"
                  name="_gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form._gotcha}
                  onChange={(e) => setForm({ ...form, _gotcha: e.target.value })}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#DDE2E5]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-[#DDE2E5]/15 bg-[#07090B] px-4 py-3 text-sm text-white placeholder:text-[#DDE2E5]/40 focus:border-[#A8FF2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[#DDE2E5]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl border border-[#DDE2E5]/15 bg-[#07090B] px-4 py-3 text-sm text-white placeholder:text-[#DDE2E5]/40 focus:border-[#A8FF2A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#DDE2E5]"
                  >
                    Subject
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {PRESET_SUBJECTS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, subject: preset }))}
                        className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                          form.subject === preset
                            ? 'bg-[#A8FF2A]/15 text-[#A8FF2A]'
                            : 'bg-[#07090B] text-[#DDE2E5]/65 hover:text-white'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Android Developer Opportunity / Project Inquiry"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E5]/15 bg-[#07090B] px-4 py-3 text-sm text-white placeholder:text-[#DDE2E5]/40 focus:border-[#A8FF2A] focus:outline-none"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#DDE2E5]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share details about the role, team, or Android project..."
                  className="mt-2 w-full resize-y rounded-xl border border-[#DDE2E5]/15 bg-[#07090B] px-4 py-3 text-sm text-white placeholder:text-[#DDE2E5]/40 focus:border-[#A8FF2A] focus:outline-none"
                />
              </div>

              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-5 flex flex-col gap-2 rounded-xl border px-4 py-3 text-xs leading-relaxed ${
                    status.type === 'success'
                      ? 'border-[#A8FF2A]/45 bg-[#A8FF2A]/10 text-[#A8FF2A]'
                      : 'border-red-500/40 bg-red-500/10 text-red-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {status.type === 'success' ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </div>
                  {(status.mailtoFallback || status.gmailFallback || status.draftText) && (
                    <div className="flex flex-wrap items-center gap-2.5 pl-6 pt-1">
                      {status.mailtoFallback && (
                        <a
                          href={status.mailtoFallback}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-current/30 bg-[#07090B]/60 px-3 py-1.5 font-semibold transition-colors hover:bg-[#07090B]"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Open Mail App</span>
                        </a>
                      )}
                      {status.gmailFallback && (
                        <a
                          href={status.gmailFallback}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-current/30 bg-[#07090B]/60 px-3 py-1.5 font-semibold transition-colors hover:bg-[#07090B]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Open in Gmail</span>
                        </a>
                      )}
                      {status.draftText && (
                        <button
                          type="button"
                          onClick={() => handleCopyDraft(status.draftText!)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-current/30 bg-[#07090B]/60 px-3 py-1.5 font-semibold transition-colors hover:bg-[#07090B]"
                        >
                          {copiedDraft ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Draft Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Draft</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={liveMailtoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#DDE2E5]/15 bg-[#07090B] px-4 py-2.5 text-xs font-medium text-[#DDE2E5] whitespace-nowrap shrink-0 transition-colors hover:border-[#A8FF2A]/55 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#A8FF2A]" />
                  <span>Open Email App</span>
                </a>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#A8FF2A] px-6 py-2.5 text-sm font-semibold text-[#07090B] whitespace-nowrap shrink-0 transition-colors hover:bg-[#99f21a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {submitting
                      ? 'Sending...'
                      : hasFormspree
                      ? 'Send via Formspree'
                      : 'Compose Email Draft'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
