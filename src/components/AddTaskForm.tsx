import { useState } from "react";

interface AddTaskFormProps {
  onAdd: (title: string, description: string) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-3 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Agregar tarea
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-surface-card p-4 shadow-sm space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        autoFocus
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-secondary/40 focus:border-primary"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
        rows={2}
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-secondary/40 focus:border-primary resize-none"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Agregar
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="cursor-pointer rounded-md border border-border px-4 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
