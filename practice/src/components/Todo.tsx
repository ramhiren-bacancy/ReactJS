import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTask, deleteTask } from "../redux/taskAction"

const Todo = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const task = useSelector((store: any) => store.task.task)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    dispatch(addTask(input))
    setInput("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {task.map((t: string, i: number) => (
        <div key={i}>
          <p>{t}</p>
          <button onClick={() => dispatch(deleteTask(i))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Todo