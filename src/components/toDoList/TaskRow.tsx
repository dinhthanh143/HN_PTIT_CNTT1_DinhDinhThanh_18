import React, { useContext } from "react";
import "./main.css";
import type { TaskType } from "./TodoList";
import { TaskContext } from "./TaskContext";


// type TaskRowProps = TaskType & {
//   handleDelete: (task: TaskType) => void;
// };
export const TaskRow = (prop: TaskType) => {
   const context = useContext(TaskContext);
   if(!context) return null
   const { handleDelete, tasks, handleToggle, handleEdit } = context;
  return (
    <div className="taskRow">
      <div>
        <input type="checkbox" checked={prop.isDone} onChange={()=> handleToggle(prop.id)} />
        <label htmlFor=""style={{textDecoration: prop.isDone? "line-through" : "none"}} >{prop.name}</label>
      </div>
      <div>
        <span className="delBtn" style={{ marginRight: "10px" }} onClick={()=> handleEdit(prop)}>✏️</span>
        <span className="delBtn" onClick={() => handleDelete(prop)}>🗑️</span>
      </div>
    </div>
  );
};
