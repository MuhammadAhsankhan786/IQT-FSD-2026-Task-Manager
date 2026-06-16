"use client";

import React, { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string) => Promise<void>;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setIsSubmitting(true);
    try {
      await onAdd(trimmedTitle);
      setTitle("");
    } catch (err) {
      // Handled by parent container
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          disabled={isSubmitting}
          className="flex-1 min-w-0 bg-slate-50 text-slate-800 rounded-xl px-4 py-3 text-sm font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400 shadow-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400/50 text-white px-5 py-3 text-sm font-semibold shadow-md shadow-indigo-100 hover:shadow-lg transition-all active:scale-[0.98] disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <svg
              className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className="-ml-0.5 mr-2 h-4 w-4 stroke-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          )}
          Add Task
        </button>
      </div>
    </form>
  );
}
