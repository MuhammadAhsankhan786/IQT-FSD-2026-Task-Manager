import { GitHubProfile } from "../types/github";

const GITHUB_API_BASE = "https://api.github.com/users";

export const githubService = {
  /**
   * Fetch public profile of a GitHub user
   */
  async fetchProfile(username: string): Promise<GitHubProfile> {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      throw new Error("GitHub username cannot be empty.");
    }

    const response = await fetch(`${GITHUB_API_BASE}/${trimmedUsername}`, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.status === 404) {
      throw new Error(`GitHub user '${trimmedUsername}' was not found.`);
    }

    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub API rate limit exceeded. Please try again later.");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub profile. Please check your network connection.");
    }

    return response.json() as Promise<GitHubProfile>;
  },
};
