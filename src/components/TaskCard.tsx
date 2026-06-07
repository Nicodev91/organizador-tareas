import type { Task, TaskStatus } from "../types";

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

const accentBorders: Record<TaskStatus, string> = {
  pending: "border-l-warning/50",
  "in-progress": "border-l-primary-light/50",
  completed: "border-l-success/50",
};

const statusBadgeColors: Record<TaskStatus, string> = {
  pending: "bg-warning-subtle text-warning",
  "in-progress": "bg-primary-subtle text-primary-dark",
  completed: "bg-success-subtle text-success",
};

const statusLabels: Record<TaskStatus, string> = {
  pending: "Pendiente",
  "in-progress": "En progreso",
  completed: "Completada",
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    pending: "in-progress",
    "in-progress": "completed",
    completed: "pending",
  };

  return (
    <div
      className={`group relative flex items-start gap-3 rounded-lg border border-border bg-surface-card p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 border-l-[3px] ${accentBorders[task.status]}`}
    >
      <button
        onClick={() => onStatusChange(task.id, nextStatus[task.status])}
        className={`mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 ${
          task.status === "completed"
            ? "border-success bg-success text-white"
            : "border-border hover:border-primary hover:bg-primary/5"
        }`}
        title={`Cambiar a ${statusLabels[nextStatus[task.status]].toLowerCase()}`}
      >
        {task.status === "completed" && (
          <svg className="size-3 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <h3 className={`truncate text-sm font-medium ${task.status === "completed" ? "text-text-tertiary line-through" : "text-text"}`}>
            {task.title}
          </h3>
          <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-none ${statusBadgeColors[task.status]}`}>
            {statusLabels[task.status]}
          </span>
        </div>
        {task.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">{task.description}</p>
        )}
        <p className="text-[11px] text-text-tertiary/60">
          {new Date(task.createdAt).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="absolute right-3 top-3 cursor-pointer rounded-md p-1 text-text-tertiary/40 opacity-0 transition-all duration-200 hover:bg-danger-subtle hover:text-danger group-hover:opacity-100"
        title="Eliminar tarea"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
