import { useLocalStorage } from "./hooks/useLocalStorage";
import { TaskSection } from "./components/TaskSection";
import { AddSectionForm } from "./components/AddSectionForm";
import type { Section, Task, TaskStatus } from "./types";

function generateId() {
  return crypto.randomUUID();
}

const defaultSections: Section[] = [
  {
    id: generateId(),
    title: "Estudios",
    tasks: [],
  },
  {
    id: generateId(),
    title: "Trabajo",
    tasks: [],
  },
  {
    id: generateId(),
    title: "Personal",
    tasks: [],
  },
];

export default function App() {
  const [sections, setSections] = useLocalStorage<Section[]>(
    "organizador-tareas-sections",
    defaultSections
  );

  const addSection = (title: string) => {
    const newSection: Section = {
      id: generateId(),
      title,
      tasks: [],
    };
    setSections((prev) => [...prev, newSection]);
  };

  const deleteSection = (sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const renameSection = (sectionId: string, title: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, title } : s))
    );
  };

  const addTask = (sectionId: string, title: string, description: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, tasks: [...s.tasks, newTask] } : s
      )
    );
  };

  const changeTaskStatus = (
    sectionId: string,
    taskId: string,
    status: TaskStatus
  ) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              tasks: s.tasks.map((t) =>
                t.id === taskId ? { ...t, status } : t
              ),
            }
          : s
      )
    );
  };

  const deleteTask = (sectionId: string, taskId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) }
          : s
      )
    );
  };

  const totalTasks = sections.reduce((acc, s) => acc + s.tasks.length, 0);
  const completedTasks = sections.reduce(
    (acc, s) => acc + s.tasks.filter((t) => t.status === "completed").length,
    0
  );

  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border-light bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-sm sm:size-9">
              <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-text sm:text-lg">Organizador de Tareas</h1>
              <p className="text-[11px] text-text-tertiary sm:text-xs">
                {totalTasks === 0
                  ? "No hay tareas registradas"
                  : `${completedTasks} de ${totalTasks} tareas completadas`}
              </p>
            </div>
          </div>
          {totalTasks > 0 && (
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden text-xs font-medium text-text-tertiary sm:inline">{progress}%</span>
              <div className="h-2 w-20 overflow-hidden rounded-full bg-border/60 sm:w-28">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:space-y-5 sm:px-6 sm:py-8">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
          >
            <TaskSection
              section={section}
              onAddTask={(title, description) =>
                addTask(section.id, title, description)
              }
              onStatusChange={(taskId, status) =>
                changeTaskStatus(section.id, taskId, status)
              }
              onDeleteTask={(taskId) => deleteTask(section.id, taskId)}
              onDeleteSection={() => deleteSection(section.id)}
              onRenameSection={(title) => renameSection(section.id, title)}
            />
          </div>
        ))}

        <div className="animate-fade-in-up" style={{ animationDelay: `${sections.length * 80}ms`, animationFillMode: "backwards" }}>
          <AddSectionForm onAdd={addSection} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-light py-6 text-center text-xs text-text-tertiary/50 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          Los datos se guardan automáticamente en tu navegador
        </div>
      </footer>
    </div>
  );
}
