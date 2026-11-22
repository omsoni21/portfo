import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Tag,
} from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

type TaskCategory = 'All' | 'Work' | 'Study' | 'Personal';

interface DemoTask {
  id: number;
  title: string;
  category: Exclude<TaskCategory, 'All'>;
  deadline: string;
  done: boolean;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: '01. Task Creation',
    description:
      'Add tasks quickly with instant StateFlow updates and Room Database local persistence.',
  },
  {
    step: 2,
    title: '02. Smart Categorization',
    description:
      'Organize workflows across Work, Study, and Personal tags with single-tap Compose filters.',
  },
  {
    step: 3,
    title: '03. Deadline Scheduling',
    description:
      'Assign clear due windows so daily priorities stay visible without clutter.',
  },
];

const INITIAL_TASKS: DemoTask[] = [
  {
    id: 1,
    title: 'Write Room DAO unit tests',
    category: 'Work',
    deadline: 'Today, 5:00 PM',
    done: false,
  },
  {
    id: 2,
    title: 'Revise Jetpack Compose State',
    category: 'Study',
    deadline: 'Tomorrow, 10:00 AM',
    done: true,
  },
  {
    id: 3,
    title: 'Evening workout & walk',
    category: 'Personal',
    deadline: 'Today, 7:30 PM',
    done: false,
  },
];

const DEADLINE_OPTIONS = ['Today, 6:00 PM', 'Tomorrow, 9:00 AM', 'This Weekend'];

interface TaskflowInteractiveDemoProps {
  compact?: boolean;
}

export function TaskflowInteractiveDemo({ compact = false }: TaskflowInteractiveDemoProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [tasks, setTasks] = useState<DemoTask[]>(INITIAL_TASKS);
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('All');

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<TaskCategory, 'All'>>('Work');
  const [newDeadline, setNewDeadline] = useState(DEADLINE_OPTIONS[0]);
  const [composerOpen, setComposerOpen] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TOUR_STEPS.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  useEffect(() => {
    if (activeStep === 0) {
      setComposerOpen(true);
      setActiveCategory('All');
    } else if (activeStep === 1) {
      setActiveCategory('Work');
    } else if (activeStep === 2) {
      setActiveCategory('All');
      setComposerOpen(true);
    }
  }, [activeStep]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    const created: DemoTask = {
      id: Date.now(),
      title: trimmed,
      category: newCategory,
      deadline: newDeadline,
      done: false,
    };
    setTasks((prev) => [created, ...prev]);
    setNewTitle('');
    setActiveCategory('All');
    setFeedback(`Saved "${trimmed}" (${newCategory} · ${newDeadline})`);
    window.setTimeout(() => setFeedback(null), 2500);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const handleReset = () => {
    setTasks(INITIAL_TASKS);
    setActiveCategory('All');
    setActiveStep(0);
    setAutoPlay(false);
    setNewTitle('');
    setFeedback(null);
  };

  const visibleTasks =
    activeCategory === 'All'
      ? tasks
      : tasks.filter((task) => task.category === activeCategory);

  const currentTour = TOUR_STEPS[activeStep];

  return (
    <div className="rounded-xl border border-[#DDE2E5]/12 bg-[#07090B] p-3.5 sm:p-4">
      <div className="flex flex-col gap-3 border-b border-[#DDE2E5]/10 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((step, idx) => (
              <button
                key={step.step}
                type="button"
                onClick={() => {
                  setAutoPlay(false);
                  setActiveStep(idx);
                }}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-colors ${
                  activeStep === idx
                    ? 'bg-[#A8FF2A] text-[#07090B] font-semibold'
                    : 'bg-[#111516] text-[#DDE2E5]/70 hover:text-white'
                }`}
              >
                Step {step.step}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              aria-label={autoPlay ? 'Pause guided tour' : 'Play guided tour'}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-[#DDE2E5]/15 bg-[#111516] px-2 text-[11px] font-medium text-[#DDE2E5] hover:border-[#A8FF2A]/55 hover:text-white"
            >
              {autoPlay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              <span>{autoPlay ? 'Pause' : 'Tour'}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset Taskflow demo"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE2E5]/15 bg-[#111516] text-[#DDE2E5]/70 hover:text-white"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xs font-semibold text-[#A8FF2A]">
              {currentTour.title}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#DDE2E5]/70">
              {currentTour.description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setAutoPlay(false);
                setActiveStep((prev) => (prev - 1 + TOUR_STEPS.length) % TOUR_STEPS.length);
              }}
              aria-label="Previous tour step"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE2E5]/15 text-[#DDE2E5]/70 hover:text-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setAutoPlay(false);
                setActiveStep((prev) => (prev + 1) % TOUR_STEPS.length);
              }}
              aria-label="Next tour step"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#DDE2E5]/15 text-[#DDE2E5]/70 hover:text-white"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <div
          className={`flex items-center justify-between gap-2 rounded-lg p-1.5 transition-colors ${
            activeStep === 1 ? 'bg-[#A8FF2A]/10 ring-1 ring-[#A8FF2A]/55' : 'bg-[#111516]'
          }`}
        >
          <div className="flex flex-wrap items-center gap-1">
            {(['All', 'Work', 'Study', 'Personal'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#A8FF2A] text-[#07090B] font-semibold'
                    : 'text-[#DDE2E5]/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="pr-1 font-mono text-[11px] tabular-nums text-[#DDE2E5]/55">
            {visibleTasks.filter((t) => t.done).length}/{visibleTasks.length}
          </span>
        </div>

        {composerOpen && (
          <form
            onSubmit={handleAddTask}
            className={`space-y-2 rounded-xl border bg-[#111516] p-3 transition-colors ${
              activeStep === 0 || activeStep === 2
                ? 'border-[#A8FF2A]/55'
                : 'border-[#DDE2E5]/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Create a task (e.g. Build Compose UI)..."
                aria-label="New task title"
                className="min-w-0 flex-1 rounded-lg border border-[#DDE2E5]/15 bg-[#07090B] px-3 py-1.5 text-xs text-white placeholder:text-[#DDE2E5]/45 focus:border-[#A8FF2A] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Add task"
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#A8FF2A] px-3 text-xs font-semibold text-[#07090B] whitespace-nowrap shrink-0 hover:bg-[#99f21a]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
              <label className="inline-flex items-center gap-1.5 text-[#DDE2E5]/75">
                <Tag className="h-3 w-3 text-[#A8FF2A]" />
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as Exclude<TaskCategory, 'All'>)
                  }
                  aria-label="Task category"
                  className="rounded border border-[#DDE2E5]/15 bg-[#07090B] px-2 py-1 text-[11px] text-white focus:border-[#A8FF2A] focus:outline-none"
                >
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Personal">Personal</option>
                </select>
              </label>

              <label
                className={`inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-[#DDE2E5]/75 ${
                  activeStep === 2 ? 'ring-1 ring-[#A8FF2A]/60 text-[#A8FF2A]' : ''
                }`}
              >
                <Calendar className="h-3 w-3 text-[#A8FF2A]" />
                <select
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  aria-label="Task deadline"
                  className="rounded border border-[#DDE2E5]/15 bg-[#07090B] px-2 py-1 text-[11px] text-white focus:border-[#A8FF2A] focus:outline-none"
                >
                  {DEADLINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </form>
        )}

        {feedback && <p className="text-[11px] font-medium text-[#A8FF2A]">{feedback}</p>}

        <div
          className={`divide-y divide-[#DDE2E5]/10 rounded-xl border border-[#DDE2E5]/10 bg-[#111516] ${
            compact ? 'max-h-[168px] overflow-y-auto' : ''
          }`}
        >
          {visibleTasks.length === 0 ? (
            <p className="px-3.5 py-4 text-center text-xs text-[#DDE2E5]/55">
              No tasks in {activeCategory}. Add one above.
            </p>
          ) : (
            visibleTasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => toggleTask(task.id)}
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    task.done
                      ? 'border-[#A8FF2A] bg-[#A8FF2A] text-[#07090B]'
                      : 'border-[#DDE2E5]/40'
                  }`}
                >
                  {task.done && <Check className="h-3 w-3 stroke-[2.5]" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-xs font-medium ${
                      task.done ? 'text-[#DDE2E5]/45 line-through' : 'text-white'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#DDE2E5]/60">
                    <span>{task.category}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-mono">{task.deadline}</span>
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
