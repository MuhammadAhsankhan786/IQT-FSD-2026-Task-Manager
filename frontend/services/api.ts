import { Task } from "../types/task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/tasks";

/**
 * Handle API responses and throw errors if non-2xx status code
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = "An error occurred while communicating with the server.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If response is not JSON, use the status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}

export const taskService = {
  /**
   * Fetch all tasks
   */
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse<Task[]>(response);
  },

  /**
   * Create a new task
   */
  async createTask(title: string): Promise<Task> {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return handleResponse<Task>(response);
  },

  /**
   * Update an existing task
   */
  async updateTask(id: string, updates: Partial<Omit<Task, "_id" | "createdAt" | "updatedAt">>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<Task>(response);
  },

  /**
   * Delete a task
   */
  async deleteTask(id: string): Promise<{ success: boolean; message: string; task: Task }> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse<{ success: boolean; message: string; task: Task }>(response);
  },
};
