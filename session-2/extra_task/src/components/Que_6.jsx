import React, { useEffect, useState } from 'react'

const Que_6 = () => {
    const[count,setCount] = useState(0)

    
    // Frist time only mount phase run, after unmount frist (0) and mount (1)
    // useEffect(()=>{
    //     console.log("mount",count)

    //     return ()=>{
    //         console.log('unmount',count)
    //     }
    // },[count])


    // useEffect(()=>{
    //     setInterval(()=>{
    //         console.log(count)
    //     },5000)
    // },[count])
    // in this case we don't clear interval, it's cause infinte loop for every count updation.
    // Solution:
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            console.log(count)
        },1000)

        return ()=>{
            clearInterval(intervalId)
        }
    },[count])
    // but also cause infinete loop of current count to o.



  return (
    <>
      <p>Count: {count}</p>
      <button onClick={()=>setCount(prevCount=>prevCount + 1)}> ADD </button>
    </>
  )
}

export default Que_6
