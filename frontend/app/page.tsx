"use client";

import React, { useState, useEffect } from "react";
import { Task } from "../types/task";
import { taskService } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import GitHubProfileCard from "../components/GitHubProfileCard";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Load all tasks from API on mount
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (err: any) {
      setError(
        err.message || "Could not connect to the database server. Ensure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add new task
  const handleAddTask = async (title: string) => {
    try {
      const newTask = await taskService.createTask(title);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err: any) {
      setError(err.message || "Failed to create task.");
      throw err;
    }
  };

  // Toggle task completed state
  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const updated = await taskService.updateTask(id, { completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err: any) {
      setError(err.message || "Failed to update task status.");
      throw err;
    }
  };

  // Update task title
  const handleUpdateTaskTitle = async (id: string, title: string) => {
    try {
      const updated = await taskService.updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err: any) {
      setError(err.message || "Failed to update task title.");
      throw err;
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete task.");
      throw err;
    }
  };

  // Filtering tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased pb-16">
      
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-slate-200/80 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              IQT-FSD-2026 Task Manager
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Assessment Phase: Full-Stack Task Board & API Integrations
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-250/30 px-3.5 py-1.5 rounded-full">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              MongoDB Connected
            </span>
          </div>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-850 px-4 py-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-red-650 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-semibold leading-relaxed">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-650 hover:text-red-800 shrink-0 font-bold text-xs uppercase tracking-wider"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Tasks Workspace (Col-span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Form Container */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Create New Task
              </h2>
              <TaskForm onAdd={handleAddTask} />
            </div>

            {/* Task List Container */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex-1 flex flex-col gap-6">
              
              {/* Header & Filters */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Tasks Workspace
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeCount} active task{activeCount !== 1 ? "s" : ""} · {completedCount}{" "}
                    completed
                  </p>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/40">
                  {(["all", "active", "completed"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        filter === type
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tasks List */}
              <div className="flex-1 flex flex-col gap-3 min-h-[250px]">
                {loading ? (
                  // Skeleton Loaders
                  Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="animate-pulse bg-slate-50 h-[68px] rounded-xl border border-slate-200/40"
                    />
                  ))
                ) : filteredTasks.length === 0 ? (
                  // Empty State
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
                    <svg
                      className="h-10 w-10 text-slate-300 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <h3 className="text-sm font-semibold text-slate-700">
                      No tasks found
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
                      {filter === "all"
                        ? "Get started by adding a task in the field above!"
                        : filter === "active"
                        ? "You have no active tasks currently."
                        : "You haven't completed any tasks yet."}
                    </p>
                  </div>
                ) : (
                  // Render Task Items
                  <div className="flex flex-col gap-3">
                    {filteredTasks.map((task) => (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                        onUpdate={handleUpdateTaskTitle}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Area (Col-span 1) */}
          <div className="flex flex-col gap-6">
            
            {/* GitHub API Integration Component */}
            <GitHubProfileCard />

            {/* Assessment Meta Data */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  System Context
                </h3>
                <h2 className="text-sm font-extrabold text-slate-800 mt-1">
                  Assessment Information
                </h2>
              </div>
              <ul className="text-xs text-slate-650 space-y-2.5 border-t border-slate-100 pt-4">
                <li className="flex justify-between">
                  <span className="font-semibold text-slate-400">Workspace:</span>
                  <span className="font-medium text-slate-700">IQT-FSD-2026</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-slate-400">Database:</span>
                  <span className="font-medium text-slate-700">MongoDB Atlas</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-slate-400">Framework:</span>
                  <span className="font-medium text-slate-700">Next.js 16.2 (App)</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-slate-400">Styling:</span>
                  <span className="font-medium text-slate-700">Tailwind CSS v4 (Light)</span>
                </li>
              </ul>
              <div className="mt-2 text-[10px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-normal">
                Answers to theoretical assessment questions are compiled in a separate root file: <a href="file:///d:/IQT-FSD-2026-Task-Manager/ASSESSMENT_ANSWERS.md" className="text-indigo-650 font-semibold hover:underline">ASSESSMENT_ANSWERS.md</a>.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
