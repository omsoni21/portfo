import {
  Activity,
  Check,
  CloudSun,
  Code2,
  Cpu,
  Database,
  FileText,
  Flame,
  Globe,
  Layers,
  MessageSquare,
  Music,
  ShoppingBag,
  Smartphone,
  Store,
  TrainFront,
  Users,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import type { ProjectItem } from '../types/portfolio';

interface ProjectVisualPreviewProps {
  project: ProjectItem;
}

export function ProjectVisualPreview({ project }: ProjectVisualPreviewProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (project.screenshotPath && !imageFailed) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B]">
        <img
          src={project.screenshotPath}
          alt={`${project.title} preview`}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  if (project.previewType === 'taskflow') {
    return <TaskflowVisualMockup />;
  }

  if (project.previewType === 'expense-tracker') {
    return <ExpenseTrackerVisualMockup />;
  }

  if (project.previewType === 'freshkart') {
    return <FreshKartVisualMockup />;
  }

  if (project.previewType === 'web-railspace') {
    return <RailspaceVisualMockup />;
  }

  if (project.previewType === 'web-alumni') {
    return <AlumniVisualMockup project={project} />;
  }

  return <GitHubAndroidVisualMockup project={project} />;
}

function TaskflowVisualMockup() {
  const sampleTasks = [
    { title: 'Room DAO unit tests', meta: 'Work · Today 5:00 PM', done: false },
    { title: 'Compose StateFlow sync', meta: 'Study · Completed', done: true },
  ];

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#A8FF2A]/14 blur-2xl"
      />

      <div className="relative flex h-full items-stretch gap-2.5">
        <div className="flex w-[60%] flex-col justify-between rounded-xl border border-white/15 bg-[#111516] p-2.5 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A8FF2A]" />
              <span className="font-display text-[11px] font-bold text-white">
                Taskflow
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#A8FF2A]">Today</span>
          </div>

          <div className="my-auto space-y-1.5 py-1">
            {sampleTasks.map((task) => (
              <div
                key={task.title}
                className="flex items-center gap-2 rounded-lg border border-white/8 bg-[#07090B] px-2 py-1"
              >
                <span
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                    task.done
                      ? 'border-[#A8FF2A] bg-[#A8FF2A] text-[#07090B]'
                      : 'border-white/30'
                  }`}
                >
                  {task.done && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
                <div className="min-w-0">
                  <p
                    className={`truncate text-[10px] font-medium ${
                      task.done ? 'text-[#DDE2E5]/45 line-through' : 'text-white'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="truncate font-mono text-[8.5px] text-[#DDE2E5]/55">
                    {task.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-1 text-[8.5px] text-[#DDE2E5]/65">
            <span>Room Offline DB</span>
            <span className="font-mono text-[#A8FF2A]">Material 3</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-xl border border-white/10 bg-[#111516]/90 p-2.5">
          <div>
            <p className="font-mono text-[8.5px] uppercase tracking-wider text-[#A8FF2A]">
              Task Manager
            </p>
            <p className="mt-1 font-display text-[11px] font-semibold leading-snug text-white">
              Create · Tag · Schedule
            </p>
          </div>
          <div className="space-y-1">
            <div className="rounded-md border border-white/8 bg-[#07090B] px-2 py-1 font-mono text-[8.5px] text-[#DDE2E5]/80">
              Work · Study · Personal
            </div>
            <div className="rounded-md bg-[#A8FF2A]/12 px-2 py-1 font-mono text-[8.5px] font-semibold text-[#A8FF2A]">
              Jetpack Compose UI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpenseTrackerVisualMockup() {
  const ledgerRows = [
    { label: 'Groceries & Food', tag: 'Daily', amount: '−₹420' },
    { label: 'Metro Commute', tag: 'Transit', amount: '−₹110' },
  ];

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#A8FF2A]/12 blur-2xl"
      />

      <div className="relative flex h-full items-stretch gap-2.5">
        <div className="flex w-[44%] flex-col justify-between rounded-xl border border-white/15 bg-[#111516] p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-[#A8FF2A]" />
              <span className="font-display text-[11px] font-bold text-white">
                Wallet
              </span>
            </div>
            <span className="font-mono text-[8.5px] text-[#DDE2E5]/60">MVVM</span>
          </div>

          <div className="my-auto rounded-lg border border-white/10 bg-[#07090B] p-2">
            <p className="text-[8.5px] text-[#DDE2E5]/60">Monthly Spend</p>
            <p className="mt-0.5 font-mono text-xs sm:text-sm font-bold tabular-nums text-[#A8FF2A]">
              ₹3,480
            </p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[58%] rounded-full bg-[#A8FF2A]" />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[8.5px] text-[#DDE2E5]/65">
            <span>Income</span>
            <span className="text-[#A8FF2A]">Expenses</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-xl border border-white/10 bg-[#111516]/90 p-2.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <span className="font-mono text-[9px] text-[#DDE2E5]/75">
              Room DAO Ledger
            </span>
            <Database className="h-3 w-3 text-[#A8FF2A]" />
          </div>

          <div className="my-auto space-y-1.5 py-1">
            {ledgerRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg border border-white/8 bg-[#07090B] px-2 py-1"
              >
                <div className="min-w-0 pr-1.5">
                  <p className="truncate text-[10px] font-medium text-white">
                    {row.label}
                  </p>
                  <p className="font-mono text-[8.5px] text-[#DDE2E5]/55">
                    {row.tag}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] font-semibold tabular-nums text-white">
                  {row.amount}
                </span>
              </div>
            ))}
          </div>

          <p className="truncate font-mono text-[8.5px] text-[#DDE2E5]/60">
            Jetpack Compose · ViewModel
          </p>
        </div>
      </div>
    </div>
  );
}

function FreshKartVisualMockup() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-[#A8FF2A]/12 blur-2xl"
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="h-3.5 w-3.5 text-[#A8FF2A]" />
            <span className="font-display text-[11px] font-bold text-white">
              FreshKart Groceries
            </span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[8.5px] text-[#A8FF2A]">
            <Store className="h-3 w-3" />
            <span>Customer &amp; Seller</span>
          </div>
        </div>

        <div className="my-auto grid grid-cols-2 gap-2 py-1">
          <div className="rounded-lg border border-white/10 bg-[#111516] p-2">
            <p className="truncate text-[10px] font-semibold text-white">
              Fresh Tomatoes
            </p>
            <p className="mt-0.5 font-mono text-[8.5px] text-[#DDE2E5]/60">
              Produce · 1 kg
            </p>
            <p className="mt-1 font-mono text-[9.5px] font-semibold text-[#A8FF2A]">
              ₹45 · In Cart
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#111516] p-2">
            <p className="truncate text-[10px] font-semibold text-white">
              Full Cream Milk
            </p>
            <p className="mt-0.5 font-mono text-[8.5px] text-[#DDE2E5]/60">
              Dairy · 1 L
            </p>
            <p className="mt-1 font-mono text-[9.5px] font-semibold text-[#A8FF2A]">
              ₹64 · Quick Add
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-1 font-mono text-[8.5px] text-[#DDE2E5]/65">
          <span>Order Dispatch &amp; Cart</span>
          <span className="text-[#A8FF2A]">Firebase Sync</span>
        </div>
      </div>
    </div>
  );
}

function RailspaceVisualMockup() {
  const rows = [
    { zone: 'W-04', parcel: 'Commercial Bay', stage: 'Active' },
    { zone: 'C-12', parcel: 'Cargo Yard', stage: 'API Synced' },
  ];

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
      <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#111516] p-2.5">
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex items-center gap-1.5">
            <TrainFront className="h-3.5 w-3.5 text-[#A8FF2A]" />
            <span className="font-display text-[11px] font-semibold text-white">
              Railspace Portal
            </span>
          </div>
          <span className="font-mono text-[8.5px] text-[#DDE2E5]/60">Next.js · API</span>
        </div>

        <div className="my-auto space-y-1.5 py-1">
          {rows.map((row) => (
            <div
              key={row.zone}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-[#07090B] px-2.5 py-1.5 text-[10px]"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-mono text-[9px] font-semibold text-[#A8FF2A]">
                  {row.zone}
                </span>
                <span className="truncate text-white">{row.parcel}</span>
              </div>
              <span className="shrink-0 font-mono text-[9px] text-[#DDE2E5]/70">
                {row.stage}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-1 font-mono text-[8.5px] text-[#DDE2E5]/60">
          <span>Lease Workflow</span>
          <span className="text-[#A8FF2A]">React + Tailwind</span>
        </div>
      </div>
    </div>
  );
}

function AlumniVisualMockup({ project }: { project: ProjectItem }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
      <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#111516] p-2.5">
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 shrink-0 text-[#A8FF2A]" />
            <span className="truncate font-mono text-[9.5px] text-[#DDE2E5]/80">
              {project.liveUrl?.replace('https://', '') ?? 'alumni-ses.netlify.app'}
            </span>
          </div>
          <span className="shrink-0 font-mono text-[8.5px] text-[#A8FF2A]">Live</span>
        </div>

        <div className="my-auto grid grid-cols-2 gap-2 py-1">
          <div className="rounded-lg border border-white/8 bg-[#07090B] p-2">
            <Users className="h-3.5 w-3.5 text-[#A8FF2A]" />
            <p className="mt-1 truncate text-[10px] font-semibold text-white">
              Directory
            </p>
            <p className="truncate text-[8.5px] text-[#DDE2E5]/60">
              Alumni Profiles
            </p>
          </div>
          <div className="rounded-lg border border-white/8 bg-[#07090B] p-2">
            <Database className="h-3.5 w-3.5 text-[#A8FF2A]" />
            <p className="mt-1 truncate text-[10px] font-semibold text-white">
              MongoDB
            </p>
            <p className="truncate text-[8.5px] text-[#DDE2E5]/60">
              Auth &amp; Updates
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-1 font-mono text-[8.5px] text-[#DDE2E5]/60">
          <span>Full-Stack Web</span>
          <span className="text-[#A8FF2A]">Netlify Deployed</span>
        </div>
      </div>
    </div>
  );
}

function GitHubAndroidVisualMockup({ project }: { project: ProjectItem }) {
  const combined = `${project.title} ${project.description}`.toLowerCase();
  const isHabitApp = combined.includes('habit') || combined.includes('streak');
  const isFitnessApp =
    combined.includes('fitness') ||
    combined.includes('step') ||
    combined.includes('calorie');
  const isWeatherApp = combined.includes('weather') || combined.includes('forecast');
  const isChatApp = combined.includes('chat') || combined.includes('message');
  const isNoteApp = combined.includes('note') || combined.includes('journal');
  const isMusicApp = combined.includes('music') || combined.includes('player');

  const primaryTech = project.technologies[0] || 'Kotlin';
  const secondaryTech = project.technologies[1] || 'Jetpack Compose';
  const tertiaryTech = project.technologies[2] || 'Android SDK';
  const cleanSymbol = project.title.replace(/[^a-zA-Z0-9]/g, '') || 'AndroidApp';

  if (isHabitApp) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#A8FF2A]/12 blur-2xl"
        />
        <div className="relative flex h-full items-stretch gap-2.5">
          <div className="flex w-[56%] flex-col justify-between rounded-xl border border-white/15 bg-[#111516] p-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <div className="flex items-center gap-1.5">
                <Flame className="h-3 w-3 text-[#A8FF2A]" />
                <span className="truncate font-display text-[11px] font-bold text-white">
                  {project.title}
                </span>
              </div>
              <span className="font-mono text-[8.5px] text-[#A8FF2A]">Streaks</span>
            </div>
            <div className="my-auto space-y-1.5 py-1">
              {[
                { name: 'Morning Kotlin Practice', streak: 'Completed' },
                { name: 'Read Architecture Docs', streak: 'Daily Goal' },
              ].map((habit, i) => (
                <div
                  key={habit.name}
                  className="flex items-center justify-between rounded-lg border border-white/8 bg-[#07090B] px-2 py-1"
                >
                  <div className="min-w-0 pr-1">
                    <p className="truncate text-[9.5px] font-medium text-white">
                      {habit.name}
                    </p>
                    <p className="font-mono text-[8px] text-[#DDE2E5]/55">
                      {habit.streak}
                    </p>
                  </div>
                  <span
                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded ${
                      i === 0 ? 'bg-[#A8FF2A] text-[#07090B]' : 'border border-white/25'
                    }`}
                  >
                    {i === 0 && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  </span>
                </div>
              ))}
            </div>
            <p className="truncate font-mono text-[8.5px] text-[#DDE2E5]/60">
              {secondaryTech} · {tertiaryTech}
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-between rounded-xl border border-white/10 bg-[#111516]/90 p-2.5">
            <p className="font-mono text-[8.5px] uppercase tracking-wider text-[#A8FF2A]">
              Weekly Consistency
            </p>
            <div className="my-auto flex h-14 items-end gap-1.5 rounded-lg border border-white/8 bg-[#07090B] px-2 py-2">
              {[45, 70, 55, 85, 65, 95, 80].map((height, idx) => (
                <div
                  key={idx}
                  style={{ height: `${height}%` }}
                  className={`flex-1 rounded-sm ${
                    idx >= 5 ? 'bg-[#A8FF2A]' : 'bg-[#A8FF2A]/40'
                  }`}
                />
              ))}
            </div>
            <p className="truncate font-mono text-[8.5px] text-[#DDE2E5]/60">
              Room + Hilt + WorkManager
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isFitnessApp) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 -bottom-8 h-28 w-28 rounded-full bg-[#A8FF2A]/12 blur-2xl"
        />
        <div className="relative flex h-full items-stretch gap-2.5">
          <div className="flex w-[48%] flex-col justify-between rounded-xl border border-white/15 bg-[#111516] p-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <div className="flex min-w-0 items-center gap-1">
                <Activity className="h-3 w-3 shrink-0 text-[#A8FF2A]" />
                <span className="truncate font-display text-[10.5px] font-bold text-white">
                  {project.title}
                </span>
              </div>
              <span className="shrink-0 font-mono text-[8.5px] text-[#A8FF2A]">Sensor</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center py-1">
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-[#A8FF2A] bg-[#07090B] shadow-[0_0_18px_rgba(168,255,42,0.2)]">
                <span className="font-mono text-[10px] font-bold text-white">Steps</span>
                <span className="font-mono text-[8px] text-[#A8FF2A]">Active</span>
              </div>
            </div>

            <p className="truncate font-mono text-[8.5px] text-[#DDE2E5]/60">
              Accelerometer Sync
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-between rounded-xl border border-white/10 bg-[#111516]/90 p-2.5">
            <p className="font-mono text-[8.5px] uppercase tracking-wider text-[#A8FF2A]">
              Live Metrics
            </p>
            <div className="my-auto space-y-1.5 py-1">
              <div className="flex items-center justify-between rounded-lg border border-white/8 bg-[#07090B] px-2 py-1">
                <span className="text-[9.5px] text-[#DDE2E5]/75">Distance</span>
                <span className="font-mono text-[9.5px] font-semibold text-white">
                  km tracker
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/8 bg-[#07090B] px-2 py-1">
                <span className="text-[9.5px] text-[#DDE2E5]/75">Calories</span>
                <span className="font-mono text-[9.5px] font-semibold text-[#A8FF2A]">
                  kcal burn
                </span>
              </div>
            </div>
            <p className="truncate font-mono text-[8.5px] text-[#DDE2E5]/60">
              {primaryTech} · {secondaryTech}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const DomainIcon = isWeatherApp
    ? CloudSun
    : isChatApp
    ? MessageSquare
    : isNoteApp
    ? FileText
    : isMusicApp
    ? Music
    : Smartphone;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#07090B] p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-[1.02]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-[#A8FF2A]/10 blur-2xl"
      />

      <div className="relative flex h-full items-stretch gap-2.5">
        <div className="flex w-[46%] flex-col justify-between rounded-xl border border-white/15 bg-[#111516] p-2.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <DomainIcon className="h-3.5 w-3.5 text-[#A8FF2A]" />
            <span className="font-mono text-[8.5px] text-[#DDE2E5]/65">Android UI</span>
          </div>

          <div className="my-auto space-y-1.5 py-1">
            <div className="rounded-lg border border-[#A8FF2A]/30 bg-[#A8FF2A]/10 px-2 py-1">
              <p className="truncate font-display text-[10px] font-bold text-white">
                {project.title}
              </p>
              <p className="truncate font-mono text-[8.5px] text-[#A8FF2A]">
                {primaryTech}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-[#07090B] px-2 py-1">
              <Layers className="h-3 w-3 shrink-0 text-[#A8FF2A]" />
              <span className="truncate text-[9px] text-[#DDE2E5]/80">
                {secondaryTech}
              </span>
            </div>
          </div>

          <div className="font-mono text-[8.5px] text-[#DDE2E5]/55">@omsoni21</div>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-xl border border-white/10 bg-[#111516]/90 p-2.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 shrink-0 text-[#A8FF2A]" />
              <span className="truncate font-mono text-[9px] text-white">
                MainActivity.kt
              </span>
            </div>
            <Cpu className="h-3 w-3 shrink-0 text-[#DDE2E5]/55" />
          </div>

          <div className="my-auto rounded-lg border border-white/8 bg-[#07090B] p-2 font-mono text-[8.5px] leading-snug text-[#DDE2E5]/80">
            <p className="text-[#A8FF2A]">@Composable</p>
            <p className="truncate text-white">fun {cleanSymbol}Screen()</p>
            <p className="truncate text-[#DDE2E5]/55">// {tertiaryTech}</p>
          </div>

          <p className="truncate font-mono text-[8.5px] text-[#DDE2E5]/60">
            GitHub Repository
          </p>
        </div>
      </div>
    </div>
  );
}
