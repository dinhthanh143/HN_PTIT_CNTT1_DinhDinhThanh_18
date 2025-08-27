import "./App.css";
import { Ex1 } from "./components/Ex1";
import { Ex2 } from "./components/Ex2";
import { Ex3 } from "./components/Ex3";
import { TodoList } from "./components/toDoList/TodoList";
function App() {
  return (
    <>
      <div className="singularComps">
        <Ex1 />
        <Ex2 />
        <Ex3 />
      </div>
      <TodoList/>
    </>
  );
}

export default App;
