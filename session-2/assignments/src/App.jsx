import { useState } from 'react'
import './App.css'
import Assi_1 from './assignments/Assi_1'
import Assi_2 from './assignments/Assi_2'
import Assi_3 from './assignments/Assi_3'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './assignments/Assi_4/Layout'
import Assi_5 from './assignments/Assi_5'
import Task_1 from './assignments/Assi_6/Task_1'
import Task_2 from './assignments/Assi_6/Task_2'

function App() {

  return (
    <>
    {/* <Assi_1></Assi_1> */}
    {/* <Assi_2></Assi_2> */}
    {/* <Assi_3></Assi_3> */}
    {/* <ThemeProvider>
        <Layout/>
    </ThemeProvider> */}
    {/* <Assi_5/> */}
    {/* <Task_1/> */}
    <Task_2/>
    </>
  )
}

export default App
