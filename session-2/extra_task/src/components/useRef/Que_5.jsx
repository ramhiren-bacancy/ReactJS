import React, { useState, useEffect, useRef } from 'react'

export default function Que_5() {
const [name, setName] = useState('')
// const renderCount = useRef(0)
// const inpRef = useRef()
const prevName = useRef('')

// useEffect(() => {
//     renderCount.current = renderCount.current+1
// })

//? select HTML tag
function handleClick(){
    console.log(inpRef); // give HTML tag
    inpRef.current.focus() // Edit propeties of HTML tag
}

// ? useRef is use to store previous values of any varible
useEffect(()=>{
    prevName.current = name
},[name])

return (
    <>
        <input  value={name} onChange={e => setName(e.target.value)}/>
        <div>My name is {name}</div>
        {/* <div>I rendered {renderCount.current} times</div> */}
        {/* <button onClick={handleClick}>Click</button> */}
        <p>My previous name is {prevName.current}</p>
    </>
    )
}