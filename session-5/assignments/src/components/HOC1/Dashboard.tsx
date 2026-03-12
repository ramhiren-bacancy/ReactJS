import withAuth from './withAuth'

const Dashboard = () => {
    console.log("dashboard rednered")
  return (
    <>
      <h1>Welcome to Dashboard</h1>
    </>
  )
}

const ProtectedDashboard = withAuth(Dashboard)

export default ProtectedDashboard

// function withAuth(Component: React.ComponentType) {
//   return function AuthenticatedComponent(props: any) {
//     const isAuthenticated = true // Replace with actual authentication logic
//     if (isAuthenticated) {
//       return <Component {...props} />
//     }
//     return <h1>Please log in to access the dashboard</h1>
//     }
// }
