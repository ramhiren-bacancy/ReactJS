import  { useCallback, useMemo, useState } from "react";
import "./New.css"

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

function New() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  // ✅ Task 1: Add Task
  const addTask = () => {
    if (input.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      name: input,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  // ✅ Task 2: Toggle Complete
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // ✅ Task 3: Filter Completed (useMemo)
  const filteredTasks = useMemo(() => {
    return showCompletedOnly
      ? tasks.filter((task) => task.completed)
      : tasks;
  }, [tasks, showCompletedOnly]);

  // ✅ Task 4: Clear All (useCallback)
  const clearAll = useCallback(() => {
    setTasks([]);
  }, []);

  // ✅ Task 5: Group Tasks (Bonus)
  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => !task.completed);
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.completed);
  }, [tasks]);

  return (
    <div className="app">
      <h1>Task Manager 🚀</h1>

      {/* Input */}
      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Controls */}
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showCompletedOnly}
            onChange={() =>
              setShowCompletedOnly((prev) => !prev)
            }
          />
          Show Completed Only
        </label>

        <button onClick={clearAll}>Clear All</button>
      </div>

      {/* Tasks List */}
      <h2>All Tasks</h2>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {task.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Bonus Section */}
      <h2>Grouped Tasks</h2>

      <h3>Pending</h3>
      <ul>
        {pendingTasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>

      <h3>Completed</h3>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} style={{ textDecoration: "line-through" }}>
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default New;