import type { Task, TaskStatus } from "../types";

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/30",
  "in-progress": "bg-primary-light/20 text-primary-dark border-primary-light/40",
  completed: "bg-success/10 text-success border-success/30",
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
    <div className="group flex items-start gap-3 rounded-lg border border-border bg-surface-card p-4 shadow-sm transition-all hover:shadow-md">
      <button
        onClick={() => onStatusChange(task.id, nextStatus[task.status])}
        className={`mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-colors ${
          task.status === "completed"
            ? "border-success bg-success text-white"
            : "border-border hover:border-primary"
        }`}
        title={`Cambiar a ${statusLabels[nextStatus[task.status]].toLowerCase()}`}
      >
        {task.status === "completed" && (
          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-medium text-text ${task.status === "completed" ? "line-through opacity-60" : ""}`}>
            {task.title}
          </h3>
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusColors[task.status]}`}>
            {statusLabels[task.status]}
          </span>
        </div>
        {task.description && (
          <p className="text-xs text-text-secondary leading-relaxed">{task.description}</p>
        )}
        <p className="text-[11px] text-text-secondary/60">
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
        className="cursor-pointer rounded p-1 text-text-secondary/40 opacity-0 transition-all hover:bg-danger/10 hover:text-danger group-hover:opacity-100"
        title="Eliminar tarea"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
