export function KotlinLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="kotlinGrad" x1="2" y1="30" x2="30" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7F52FF" />
          <stop offset="50%" stopColor="#C711E1" />
          <stop offset="100%" stopColor="#E44857" />
        </linearGradient>
      </defs>
      <path d="M29 29H3V3H29L16 16L29 29Z" fill="url(#kotlinGrad)" />
    </svg>
  );
}

export function ComposeLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" fill="#0F2A38" stroke="#4285F4" strokeWidth="1.5" />
      <path d="M16 3L27 9.5L16 16L5 9.5L16 3Z" fill="#3DDC84" />
      <path d="M16 16L27 9.5V22.5L16 29V16Z" fill="#4285F4" />
      <path d="M16 16L5 9.5V22.5L16 29V16Z" fill="#0D652D" />
      <polygon points="16,10.5 21,13.5 21,19.5 16,22.5 11,19.5 11,13.5" fill="#07090B" />
    </svg>
  );
}

export function AndroidBotLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M10.5 9.5L8.3 5.8" stroke="#A8FF2A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M21.5 9.5L23.7 5.8" stroke="#A8FF2A" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M6.5 19.5C6.5 13.7 10.75 9.5 16 9.5C21.25 9.5 25.5 13.7 25.5 19.5V20.5H6.5V19.5Z"
        fill="#A8FF2A"
      />
      <circle cx="12" cy="15.2" r="1.4" fill="#07090B" />
      <circle cx="20" cy="15.2" r="1.4" fill="#07090B" />
      <rect x="8.5" y="22" width="15" height="4.5" rx="2" fill="#A8FF2A" fillOpacity="0.85" />
    </svg>
  );
}

export function FirebaseLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 24.5L9.8 5.2C10 4.2 11.3 4 11.8 4.9L15.4 11.6L6.5 24.5Z" fill="#FFA000" />
      <path d="M6.5 24.5L15.4 11.6L19 7.8C19.6 7.1 20.8 7.5 20.9 8.5L25.5 24.5L16 29.5L6.5 24.5Z" fill="#FFCA28" />
      <path d="M6.5 24.5L19 14.5L25.5 24.5L16 29.5L6.5 24.5Z" fill="#F57C00" fillOpacity="0.85" />
    </svg>
  );
}

export function ReactLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
      <ellipse cx="16" cy="16" rx="12" ry="4.8" stroke="#61DAFB" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)" stroke="#61DAFB" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)" stroke="#61DAFB" strokeWidth="1.5" />
    </svg>
  );
}

export function NextJsLogo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12.5" stroke="#DDE2E5" strokeWidth="1.5" fill="#0B0E10" />
      <path d="M11.5 21V11L22.5 24.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.5 11V17.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
