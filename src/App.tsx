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

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-text">Organizador de Tareas</h1>
            <p className="text-xs text-text-secondary">
              {totalTasks === 0
                ? "No hay tareas registradas"
                : `${completedTasks} de ${totalTasks} tareas completadas`}
            </p>
          </div>
          {totalTasks > 0 && (
            <div className="h-2 w-32 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-success transition-all duration-500"
                style={{
                  width: `${Math.round((completedTasks / totalTasks) * 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-5xl space-y-5 px-6 py-8">
        {sections.map((section) => (
          <TaskSection
            key={section.id}
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
        ))}

        <AddSectionForm onAdd={addSection} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-text-secondary/60">
        Los datos se guardan automáticamente en tu navegador
      </footer>
    </div>
  );
}
