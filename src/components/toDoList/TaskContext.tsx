import React, { createContext } from "react";
import type { TaskType } from "./TodoList";

export const TaskContext = createContext<{
  tasks: TaskType[];
  handleDelete: (task: TaskType) => void;
  handleToggle: (id:number) => void;
  handleEdit: (task: TaskType)=> void
} | null>(null);
