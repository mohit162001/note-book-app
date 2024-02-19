import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootPage from './pages/RootPage.js'
import LoginPage from './pages/LoginPage.js'
import ResgistrationPage from './pages/RegistrationPage.js'
const router = createBrowserRouter([
  {path:'/',element:<RootPage/>,children:[]},
  {path:'/login',element:<LoginPage/>},
  {path:'/register',element:<ResgistrationPage/>}
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App