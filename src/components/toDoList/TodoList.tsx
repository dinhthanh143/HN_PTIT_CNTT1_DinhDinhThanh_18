import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import "./main.css";
import { AddFunctions } from "./AddFunctions";
import { TaskRow } from "./TaskRow";
import Swal from "sweetalert2";
import { taskReducer } from "./toDoReducer";
import { TaskContext } from "./TaskContext";
export type TaskType = {
  name: string;
  id: number;
  isDone: boolean;
};

export const TodoList = () => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const local = localStorage.getItem("ss16_Tasks");
    return local
      ? JSON.parse(local)
      : [
          { id: 1, name: "Học bài", isDone: false },
          { id: 2, name: "Chơi game", isDone: false },
          { id: 3, name: "Đá bóng", isDone: true },
        ];
  });

  const [input, setValue] = useState({
    value: "",
    error: false,
  });

  const handleAdd = useCallback(() => {
    if (input.value === "" || tasks.some((t) => t.name === input.value)) {
      setValue((prev) => ({
        ...prev,
        error: true,
      }));
    } else {
      dispatch({ type: "ADD", payload: input.value });
      //reset input
      setValue({
        value: "",
        error: false,
      });
    }
  }, [input.value, tasks]);

  const handleInputChange = useCallback((newval: string) => {
    setValue((prev) => ({
      ...prev,
      value: newval,
    }));
  }, []);

  const handleToggle = useCallback((id: number) => {
    dispatch({ type: "TOGGLE", payload: id });
  }, []);

  const handleEdit = useCallback((prop: TaskType) => {
    Swal.fire({
      title: "Sửa nhiệm vụ",
      input: "text",
      inputPlaceholder: "Nhập nhiệm vụ mới...",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      showLoaderOnConfirm: true,
      inputValidator(value) {
        if (
          tasks.some(
            (t) =>
              t.name.toLowerCase() === value.toLowerCase() && t.id !== prop.id
            || value.trim() === ""
          )
        ) {
          return "Dữ liệu không được trùng hoặc bỏ trống";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "EDIT",
          payload: { id: prop.id, newVal: result.value },
        });
        Swal.fire("Sửa thành công!", "", "success");
      }
    });
  }, [tasks]);

  const handleDelete = useCallback((prop: TaskType) => {
    Swal.fire({
      title: "Xác nhận xóa",
      text: `Bạn có chắc muốn xóa "${prop.name}" không?`,
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "DELETE", payload: prop.id });
        Swal.fire("Xóa thành công!", "", "success");
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("ss16_Tasks", JSON.stringify(tasks));
  }, [tasks]);

  const calCompleted = useMemo(() => {
    return tasks.filter((t) => t.isDone).length;
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{ tasks, handleDelete, handleToggle, handleEdit }}>
      <div className="container">
        <h2>Danh sách công việc</h2>
        <AddFunctions
          input={input}
          handleInputChange={handleInputChange}
          handleAdd={handleAdd}
        />
        <div
          style={{
            textAlign: "left",
            width: "85%",
            color: "red",
            display: input.error ? "block" : "none",
          }}>
          Tên không được để trống hoặc trùng
        </div>
        {tasks.map((task) => (
          <TaskRow {...task} key={task.id} />
        ))}
        <div
          className="taskcompletion"
          style={{ color: calCompleted === tasks.length ? "green" : "black" }}>
          Công việc đã hoàn thành: {calCompleted}/{tasks.length}
        </div>
      </div>
    </TaskContext.Provider>
  );
};
