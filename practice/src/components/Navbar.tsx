import { useDispatch, useSelector } from "react-redux"
import {  countTask } from "../redux/taskAction"

const Navbar = () => {
    const dispatch = useDispatch()
    // const count = useSelector(state => state.count)
    const count=useSelector(store=>store.task.count)
  return (
    <>
      <p>Hello Navbar</p>
      <button onClick={()=>dispatch(countTask())}>Click me</button>
      <p>{count}</p>
      {/* <p>{task.length}</p> */}
    </>
  )
}

export default Navbar
