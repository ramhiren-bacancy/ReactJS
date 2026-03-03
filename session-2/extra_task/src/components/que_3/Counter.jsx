import { useCounter } from "./CountContext"

const Counter = () => {
    const { count , setCount} = useCounter()

  return (
    <>
      <h1>Counter Compontents : {count}</h1>
      <button onClick={()=>setCount(prev => prev + 1)}>Increment</button>
      <button onClick={()=>setCount(prev => prev-1)}>Decrement</button>
    </>
  )
}

export default Counter
