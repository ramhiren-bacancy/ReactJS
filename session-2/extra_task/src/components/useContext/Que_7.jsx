import React from 'react'
import Compontents_2 from './Compontents_2'
import Components_1 from './Components_1'
import { ThemeProvider, useTheme } from './Context'

const Que_7 = () => {
  return (
    <>
    
      <h1>I am a Main</h1>
       <ThemeProvider>
       <Components_1/>
       <Compontents_2/>
    </ThemeProvider>
    </>
  )
}

export default Que_7
