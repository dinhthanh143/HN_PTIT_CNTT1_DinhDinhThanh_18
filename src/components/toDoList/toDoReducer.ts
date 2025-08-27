import type { TaskType } from "./TodoList";
export type ActionType =
  | { type: "ADD"; payload: string }
  | { type: "EDIT"; payload: { id: number; newVal: string } }
  | { type: "DELETE"; payload: number }
  | { type: "LOAD"; payload: TaskType[] }
  | { type: "TOGGLE"; payload: number };

export const taskReducer = (
  state: TaskType[],
  action: ActionType
): TaskType[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Math.ceil(Math.random() * 100000),
          name: action.payload,
          isDone: false,
        },
      ];
      break;
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
      break;
    case "EDIT":
      return state.map((prev) =>
        prev.id === action.payload.id
          ? {
              ...prev,
              name: action.payload.newVal,
            }
          : prev
      );
    case "LOAD":
      return action.payload;
    case "TOGGLE":
      return state.map(task =>
        task.id === action.payload?{
            ...task,
            isDone : !task.isDone
        }:
        task
      )
    default:
      return state;
  }
};
