import React, { useState } from "react"
import useLocalStorage from "./useLocal"

const Test = () => {
    const [username,setUsername,retrieveValue] = useLocalStorage("username")
    const [item, setItem] =useState("")

    function handleFatch(e){
        const item = retrieveValue(e.target.value)
        setItem(item)
    }

  return (
    <>
        <input type="text"  onChange={e => setUsername(e.target.value)} />
    <br /><br />
        <input type="text" onChange={handleFatch}/>
        {item}

    </>
  )
}

export default Test
