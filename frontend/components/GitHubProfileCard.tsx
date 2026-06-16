"use client";

import React, { useState, useEffect } from "react";
import { GitHubProfile } from "../types/github";
import { githubService } from "../services/github";

export default function GitHubProfileCard() {
  const [username, setUsername] = useState("google");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchProfile = async (targetUsername: string) => {
    if (!targetUsername.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await githubService.fetchProfile(targetUsername);
      setProfile(data);
      setUsername(data.login);
    } catch (err: any) {
      setError(err.message || "Failed to load GitHub profile.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial profile on mount
  useEffect(() => {
    fetchProfile(username);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchProfile(searchInput);
      setSearchInput("");
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      {/* Header section */}
      <div>
        <h2 className="text-md font-bold text-slate-800 flex items-center gap-2">
          <svg
            className="h-5 w-5 text-slate-700 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
          GitHub Profile Integrator
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Integrates GitHub Public API to showcase stats.
        </p>
      </div>

      {/* Profile Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search GitHub username..."
          className="flex-1 min-w-0 bg-slate-50 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 text-xs font-bold shadow-sm hover:shadow transition-all active:scale-[0.98]"
        >
          Search
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <svg
            className="animate-spin h-6 w-6 text-slate-400"
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
          <span className="text-xs text-slate-500">Fetching GitHub profile...</span>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start">
          <svg
            className="h-5 w-5 text-red-650 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h4 className="text-xs font-bold text-red-800">
              Error Fetching Profile
            </h4>
            <p className="text-xs text-red-750 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Profile Details card */}
      {!loading && !error && profile && (
        <div className="flex flex-col gap-4">
          {/* Main Info */}
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar_url}
              alt={`${profile.login} avatar`}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-800 truncate">
                {profile.name || profile.login}
              </h3>
              <p className="text-xs text-slate-500">@{profile.login}</p>
              {profile.location && (
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 font-semibold">
                  <svg
                    className="h-3 w-3 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {profile.location}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-3">
              "{profile.bio}"
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center transition-all hover:bg-slate-100/60">
              <span className="block text-xl font-extrabold text-slate-800 leading-none">
                {profile.public_repos}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                Public Repos
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center transition-all hover:bg-slate-100/60">
              <span className="block text-xl font-extrabold text-slate-800 leading-none">
                {profile.followers}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                Followers
              </span>
            </div>
          </div>

          {/* GitHub link button */}
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-250 hover:bg-slate-50 text-slate-700 px-4 py-2.5 text-xs font-bold shadow-sm transition-all"
          >
            Visit GitHub Profile
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
