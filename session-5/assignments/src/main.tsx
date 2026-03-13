import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedDashboard from './components/HOC1/Dashboard.tsx'
import Login from './components/HOC1/Login.tsx'
import Search from './components/customHooks/Search.tsx'
import Test from './components/useLocalStorage/Test.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      // {index: true, element: <App />},
      {path: 'dashboard', element: <ProtectedDashboard />},
      {path: 'login', element: <Login /> },
      {path: 'search', element: <Search/>},
      {path: 'local', element:<Test/>}
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
