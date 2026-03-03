import React, { useEffect, useState } from 'react'

const Que_2 = () => {
    const[time,setTime] = useState(new Date().toLocaleTimeString())
    const[show,setShow] = useState(true)

    // setInterval(()=>{
    //     setTime(new Date().toLocaleTimeString())
    //     console.log("Hello") // Exponesially print "Hello" in console.
    // },1000)

        useEffect(()=>{
            if(!show)return
            const intervalId =setInterval(()=>{
                setTime(new Date().toLocaleTimeString())
                console.log("Hello")
            },1000)

            return () =>{
                clearInterval(intervalId)
            }
        },[show])


  return (
    <>
        <button onClick={()=>setShow(!show)}>{show?"show":"Hide"}</button>
        {
            show&& <h1>Clock Time: {time}</h1>
        }
    </>
  )
}

export default Que_2
