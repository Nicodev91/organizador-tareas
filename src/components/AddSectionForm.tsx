import { useState } from "react";

interface AddSectionFormProps {
  onAdd: (title: string) => void;
}

const suggestions = ["Estudios", "Trabajo", "Personal", "Proyectos", "Salud", "Lecturas"];

export function AddSectionForm({ onAdd }: AddSectionFormProps) {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
    setIsOpen(false);
  };

  const handleSuggestion = (suggestion: string) => {
    onAdd(suggestion);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-5 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
      >
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Nueva sección
      </button>
    );
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 p-5">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre de la sección"
          autoFocus
          className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-secondary/40 focus:border-primary"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Crear sección
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
      <div className="mt-3">
        <p className="mb-1.5 text-xs text-text-secondary/60">Sugerencias:</p>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestion(s)}
              className="cursor-pointer rounded-full border border-border bg-white px-3 py-1 text-xs text-text-secondary transition-colors hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
