import React, { useState } from 'react'

const Assi_1 = () => {
    const [age,setAge] = useState(0)
    const[name,setName] = useState('')
  return (
    <>
      <p>Your Age : {age}</p>
      <button onClick={()=>setAge(age + 1)}>Increate Age</button>
      <p>{name}</p>
      <input type="text" value={name} onChange={(e) =>setName(e.target.value) } />
    </>
  )
}

export default Assi_1
