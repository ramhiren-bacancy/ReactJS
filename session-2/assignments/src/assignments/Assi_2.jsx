import React, { useEffect, useState } from 'react'

const Assi_2 = () => {
    const [count,setCount] = useState(0)
    const[show,setShow] = useState(true)

    useEffect(()=>{
        if(!show)return
        console.log("Mounted");

        const intervalId = setInterval(()=>{
            console.log("in Interval")
            setCount(prev => prev+1)
        },1000)
        
        return ()=>{
            console.log("unmounted")
            setCount(0)
            clearInterval(intervalId)
        }
    },[show])

  return (
    <>
       <button onClick={()=>setShow(!show)}>{show?"show":"Hide"}</button>
        {
            show&& <h1> count : {count}</h1>
        }
    </>
  )
}

export default Assi_2
