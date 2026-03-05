import React from 'react'
import { useTheme } from './Context'

const Compontents_2 = () => {
    const {toggleTheme, theme} = useTheme()
  
  return (
    <>
      <h1 style={theme}> I am a Components - 2</h1>
      <button onClick={toggleTheme}> Toggle</button>
    </>
  )
}

export default Compontents_2
