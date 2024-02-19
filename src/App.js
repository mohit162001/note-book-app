import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootPage from './pages/RootPage.js'
import LoginPage from './pages/LoginPage.js'
import ResgistrationPage from './pages/RegistrationPage.js'
import { checkAuth } from './helper.js'
const router = createBrowserRouter([
  {path:'/',element:<RootPage/>,loader:checkAuth,children:[]},
  {path:'/login',element:<LoginPage/>},
  {path:'/register',element:<ResgistrationPage/>}
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App