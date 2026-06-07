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
    <section className="rounded-xl border border-border bg-surface shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              autoFocus
              className="rounded-md border border-border px-2 py-1 text-lg font-semibold text-text outline-none focus:border-primary"
            />
          ) : (
            <h2
              className="text-lg font-semibold text-text cursor-pointer hover:text-primary transition-colors"
              onClick={() => {
                setEditTitle(section.title);
                setIsEditing(true);
              }}
              title="Click para renombrar"
            >
              {section.title}
            </h2>
          )}
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {section.tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Status filter */}
          <div className="flex rounded-lg border border-border bg-white p-0.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  filter === f.value
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={onDeleteSection}
            className="cursor-pointer rounded-md p-1.5 text-text-secondary/40 transition-colors hover:bg-danger/10 hover:text-danger"
            title="Eliminar sección"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2 p-5">
        {filteredTasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-text-secondary/60">
            {filter === "all"
              ? "No hay tareas aún. ¡Agrega una!"
              : "No hay tareas con ese filtro."}
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDeleteTask}
            />
          ))
        )}
        <AddTaskForm onAdd={onAddTask} />
      </div>
    </section>
  );
}
