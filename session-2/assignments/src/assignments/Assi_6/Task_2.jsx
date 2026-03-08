import React, { useReducer } from 'react'


// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return { count: 0 };

    default:
      return state;
  }
};


const Task_2 = () => {

  // useReducer hook
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
       <h2>useReducer Example</h2>

      <h3>Count: {state.count}</h3>

      <button onClick={() => dispatch({ type: "increment" })}>
        Increment
      </button>

      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </>
  )
}

export default Task_2
