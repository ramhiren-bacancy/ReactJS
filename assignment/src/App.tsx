import React, { useCallback, useMemo, useState } from "react";
import "./App.css";

type Task = {
  id: number;
  name: string;
  complete: boolean;
};

function App() {
  const [task, setTask] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [onlyCompleted, setOnlyCompleted] = useState<boolean>(false);

  function handleAdd() {
    if (todo.trim() == "") return;
    const temp_task: Task = {
      id: Date.now(),
      name: todo,
      complete: false,
    };
    setTask([...task, temp_task]);
    setTodo("");
  }

  const filteredTask = useMemo(() => {
    return onlyCompleted ? task.filter((t) => t.complete) : task;
  }, [task, onlyCompleted]);

  function handleComplete(e: React.ChangeEvent<HTMLInputElement>) {
    const id = Number(e.target.value);

    const updateTask = task.map((t) => {
      if (id == t.id) {
        return {
          ...t,
          complete: e.target.checked ? true : false,
        };
      }
      return t;
    });
    console.log("updated task", updateTask);
    setTask(updateTask);
  }


  const handleDelete = useCallback((id:number)=>{
    const updateTask = task.filter((t) => id != t.id);
    setTask(updateTask);
  },[task])

  const handleAllDelete = useCallback(() => {
    setTask([]);
  }, []);

  const pendingTasks = useMemo(() => {
    return task.filter((t) => !t.complete);
  }, [task]);
  const completedTask = useMemo(() => {
    return task.filter((t) => t.complete);
  }, [task]);

  return (
    <>
      <h1 className="text-4xl text-red-500">Task Manager</h1>
      <div className="px-16 flex justify-center gap-2">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="border border-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />
        <button
          className="px-4 border-white bg-green-600 text-white"
          onClick={handleAdd}
        >
          Add
        </button>

        <button
          className="px-4 border-white bg-amber-300 text-black"
          onClick={() => setOnlyCompleted(true)}
        >
          Completed task
        </button>
        <button
          className="px-4 border-white  bg-amber-700 text-black"
          onClick={() => setOnlyCompleted(false)}
        >
          All task
        </button>

        <button
          className="px-4 border-black white bg-red-600 text-white"
          onClick={handleAllDelete}
        >
          Delete All
        </button>
      </div>

      <div className="px-24">
        {filteredTask &&
          filteredTask.map((t) => (
            <div key={t.id} className=" flex justify-between p-2 rounded bg-gray-500 mt-4 text-white border-black">
              <label
                htmlFor={t.name}
                className={t.complete ? "line-through text-gray-400" : ""}
              >
                {t.name}
              </label>
              <input
                type="checkbox"
                id={t.name}
                value={t.id}
                checked={t.complete}
                onChange={handleComplete}
              />
              <button
                className="border-black rounded px-2 text-white bg-red-500"
                onClick={() => handleDelete(t.id)}
              >
                delete
              </button>
            </div>
          ))}
      </div>

      <div className="flex justify-around">
        <div>
          <p className="text-2xl text-blue-500">Pending Tasks</p>
          <ul className="text-red-500">
            {pendingTasks &&
              pendingTasks.map((p) => {
                return <li>{p.name}</li>;
              })}
          </ul>
        </div>
        <div>
          <p className="text-2xl text-blue-500">Completed Tasks</p>
          <ul className="text-green-600">
            {completedTask &&
              completedTask.map((p) => {
                return <li>{p.name}</li>;
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;