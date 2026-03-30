import { useDispatch, useSelector } from "react-redux"
import { countIncrement } from "../redux/taskAction"

const Navbar = () => {
    const dispatch = useDispatch()
    const count = useSelector(state => state.count)
    // const task = useSelector(state => state.task.task)
  return (
    <>
      <p>Hello Navbar</p>
      <button onClick={()=>dispatch(countIncrement())}>Click me</button>
      <p>{count}</p>
      {/* <p>{task.length}</p> */}
    </>
  )
}

export default Navbar
