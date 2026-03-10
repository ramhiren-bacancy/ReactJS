import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access admin page.</p>

      <Link to="/">Go Home</Link>
    </>
  )
}

export default Unauthorized
