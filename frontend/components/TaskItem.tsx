"use client";

import React, { useState, useRef } from "react";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string) => Promise<void>;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const isPreventSaveRef = useRef(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await onToggle(task._id, !task.completed);
    } catch (err) {
      // Handled by parent
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBlur = async () => {
    // If escape key or other flow set prevent save, exit early
    if (isPreventSaveRef.current) {
      isPreventSaveRef.current = false;
      return;
    }

    const trimmed = editedTitle.trim();
    if (!trimmed || trimmed === task.title) {
      setIsEditing(false);
      setEditedTitle(task.title);
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(task._id, trimmed);
      setIsEditing(false);
    } catch (err) {
      setEditedTitle(task.title);
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Blur the input which triggers the actual saving logic in handleBlur
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      isPreventSaveRef.current = true;
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (err) {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
        task.completed
          ? "bg-slate-50/50 border-slate-100"
          : "bg-white border-slate-200/60 hover:shadow-sm hover:border-indigo-500/30 hover:-translate-y-[1px]"
      } ${(isUpdating || isDeleting) ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-3 flex-1 mr-4">
        {/* Completion Checkbox */}
        <button
          onClick={handleToggle}
          type="button"
          disabled={isUpdating || isDeleting}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
            task.completed
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "border-slate-350 hover:border-indigo-500"
          }`}
        >
          {task.completed && (
            <svg
              className="h-3.5 w-3.5 stroke-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Title Content */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 rounded-lg px-3 py-1.5 text-sm font-semibold border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          </form>
        ) : (
          <span
            className={`text-sm font-semibold transition-all duration-200 ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-700"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-slate-400 hover:text-indigo-650 hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Task"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Task"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
