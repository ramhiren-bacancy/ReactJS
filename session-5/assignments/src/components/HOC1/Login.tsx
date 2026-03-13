
const Login = () => {
    const handleLogin = () => {
        localStorage.setItem('token', 'XAZSDVFREW')
    }
  return (
    <>
    <h1>Login Page</h1>
    <h2>Please Click Button</h2>
      <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default Login
