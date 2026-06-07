export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  deadlineDays?: number;
}

export interface Section {
  id: string;
  title: string;
  tasks: Task[];
}

export type ViewFilter = "all" | TaskStatus;
