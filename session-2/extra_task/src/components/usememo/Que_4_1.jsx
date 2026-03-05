import React, { useEffect, useMemo, useState } from 'react'

const Que_4_1 = () => {
    const[number, setNumber] = useState(0)
    const[red,setRed] = useState(false)

    const double = useMemo( ()=>{
        return doubleNumber(number)
    },[number])

    const theme = useMemo(()=>{
        return {
            backgroundColor : red ? 'red' : 'black',
            color : red ? 'green' : 'white'
        }
    },[red])

    //when you change number that theme also change why?
    // bcz - theme is object and every render it's create new object. that's why 
    // solve = use useMemo
    useEffect(()=>{
        console.log('theme change')
    },[theme])


    function doubleNumber(number){
        for (let i = 0; i < 1000000; i++) {}
        console.log('double function call')
        return number*2
    }

  return (
    <>
      <input type="number" onChange={(e)=> setNumber(e.target.value)} />
      <p>{number}</p>

    <button onClick={()=> setRed(prev => !prev)}>Toggle Theme</button>
    <p style={theme}>{double}</p>
    </>
  )
}

export default Que_4_1