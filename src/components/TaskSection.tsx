import { useState } from "react";
import type { Section, TaskStatus, ViewFilter } from "../types";
import { TaskCard } from "./TaskCard";
import { AddTaskForm } from "./AddTaskForm";

interface TaskSectionProps {
  section: Section;
  onAddTask: (title: string, description: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteSection: () => void;
  onRenameSection: (title: string) => void;
}

const filters: { value: ViewFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendientes" },
  { value: "in-progress", label: "En progreso" },
  { value: "completed", label: "Completadas" },
];

export function TaskSection({
  section,
  onAddTask,
  onStatusChange,
  onDeleteTask,
  onDeleteSection,
  onRenameSection,
}: TaskSectionProps) {
  const [filter, setFilter] = useState<ViewFilter>("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);

  const filteredTasks =
    filter === "all"
      ? section.tasks
      : section.tasks.filter((t) => t.status === filter);

  const handleRename = () => {
    if (editTitle.trim() && editTitle.trim() !== section.title) {
      onRenameSection(editTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <section className="rounded-xl border border-border bg-surface-card shadow-card transition-all">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border-light px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
        <div className="flex items-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              autoFocus
              className="animate-fade-in rounded-md border border-border px-2 py-1 text-base font-semibold text-text outline-none transition-colors focus:border-primary sm:text-lg"
            />
          ) : (
            <h2
              className="text-base font-semibold text-text transition-colors hover:text-primary sm:text-lg"
              onClick={() => {
                setEditTitle(section.title);
                setIsEditing(true);
              }}
              title="Click para renombrar"
            >
              {section.title}
            </h2>
          )}
          <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-md bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
            {section.tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Status filter */}
          <div className="flex rounded-lg border border-border bg-surface p-0.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`cursor-pointer rounded-md px-2 py-1 text-[11px] font-medium transition-all sm:px-2.5 sm:py-1 sm:text-xs ${
                  filter === f.value
                    ? "bg-white text-primary shadow-sm"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={onDeleteSection}
            className="cursor-pointer rounded-md p-1.5 text-text-tertiary/50 transition-colors hover:bg-danger-subtle hover:text-danger"
            title="Eliminar sección"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2 p-4 sm:p-5">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary-subtle">
              <svg className="size-5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm text-text-tertiary">
              {filter === "all"
                ? "No hay tareas aún. ¡Agrega una!"
                : "No hay tareas con ese filtro."}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
              >
                <TaskCard
                  task={task}
                  onStatusChange={onStatusChange}
                  onDelete={onDeleteTask}
                />
              </div>
            ))}
          </div>
        )}
        <AddTaskForm onAdd={onAddTask} />
      </div>
    </section>
  );
}
