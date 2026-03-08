import React from 'react'
import { useTheme } from './Context'

const Components_1 = () => {
   const {toggleTheme, theme} = useTheme()
 
  return (
    <>
      <h1 style={theme}>I am A Components - 1</h1>
      <button onClick={toggleTheme}> Toggle </button>
    </>
  )
}

export default Components_1
