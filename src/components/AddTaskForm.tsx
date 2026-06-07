import { useState } from "react";

interface AddTaskFormProps {
  onAdd: (title: string, description: string, deadlineDays: number | undefined) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDays, setDeadlineDays] = useState<number | "">("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(
      title.trim(),
      description.trim(),
      deadlineDays === "" ? undefined : Number(deadlineDays)
    );
    setTitle("");
    setDescription("");
    setDeadlineDays("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-3 text-sm text-text-tertiary transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary-subtle/50"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Agregar tarea
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-slide-down rounded-lg border border-border bg-surface-elevated p-4 shadow-card space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        autoFocus
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-tertiary/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
        rows={2}
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-tertiary/50 focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
      />
      <div className="flex items-center gap-2">
        <svg className="size-4 shrink-0 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
        <input
          type="number"
          value={deadlineDays}
          onChange={(e) =>
            setDeadlineDays(
              e.target.value === ""
                ? ""
                : Math.min(365, Math.max(1, Number(e.target.value)))
            )
          }
          placeholder="Días límite (opcional)"
          min={1}
          max={365}
          className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-tertiary/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark active:scale-[0.97]"
        >
          Agregar
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="cursor-pointer rounded-md border border-border px-4 py-1.5 text-sm text-text-secondary transition-all duration-200 hover:bg-surface active:scale-[0.97]"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
