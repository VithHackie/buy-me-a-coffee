import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AdminPage from './pages/Admin.jsx'
import NotFound from './pages/Error.jsx'

const router = createBrowserRouter([
  
  {
    path : "/",
    element : <App />,
    errorElement : <NotFound />
  },
  {
    path : "/admin",
    element : <AdminPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>  
  </StrictMode>,
)
