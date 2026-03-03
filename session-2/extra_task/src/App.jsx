import './App.css'
import Que_1 from './components/Que_1'
import Que_2 from './components/Que_2'
import Body from './components/que_3/Body'
import { CounterProvider } from './components/que_3/CountContext'

function App() {

  return (
    <>
    {/* <Que_1/> */}
    {/* <Que_2/> */}
    <CounterProvider>
      <Body/>
    </CounterProvider>
    </>
  )
}

export default App
