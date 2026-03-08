import React, { useCallback, useState } from 'react'
import List from './List'

const BasicUseCallback = () => {
    const [number,setNumber] =useState(0)
    const [dark,setDark] = useState(true)

    const getItems = useCallback(() =>{
        return [number,number+1,number+2]
    },[number])

    const theme = {
      backgroundColor : dark ? 'black':'white',
      color : dark ? 'white': 'black'
    }
  return (
    <>
      <div style={theme}>
        <input type="number" onChange={(e) => setNumber(parseInt(e.target.value))} />

        <button onClick={()=>setDark(prev=>!prev)}>Toggle btn</button>
        <List getItems={getItems}/>
      </div>
    </>
  )
}

export default BasicUseCallback
