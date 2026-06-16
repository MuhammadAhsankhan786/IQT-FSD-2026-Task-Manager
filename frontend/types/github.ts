export interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
  bio: string | null;
  location?: string | null;
  company?: string | null;
}
