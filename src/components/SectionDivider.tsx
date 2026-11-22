export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#DDE2E5]/15 to-transparent">
        <div className="mx-auto h-px w-1/3 bg-gradient-to-r from-transparent via-[#A8FF2A]/35 to-transparent" />
      </div>
    </div>
  );
}
