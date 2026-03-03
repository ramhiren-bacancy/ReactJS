import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";


// create context
export const CountContext = createContext()

// create custom hook
export const useCounter= ()=>{
    const context = useContext(CountContext)

    if(!context){
        throw new Error("userCounter must be use with in provider")
    }

    return context
}

// Provider Components
export const CounterProvider= ({children})=>{
    const [count,setCount] = useState(0)



  return (
    <CountContext.Provider value={{count,setCount}}>
      {children}
    </CountContext.Provider>
  )
}

