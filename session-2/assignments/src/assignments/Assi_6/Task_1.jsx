import React, { useRef, useState } from 'react'

const Task_1 = () => {
    const inputRef = useRef(null);      
  const previousValue = useRef("");  

  const [text, setText] = useState("");

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    previousValue.current = text; // store old value
    setText(e.target.value);
  };
  return (
    <>
      <h2>useRef Example</h2>

      <input ref={inputRef} type="text" value={text} onChange={handleChange}/>

      <button onClick={handleFocus}>Focus Input</button>

      <p>Current: {text}</p>
      <p>Previous (stored in ref): {previousValue.current}</p>
    </>
  )
}

export default Task_1
