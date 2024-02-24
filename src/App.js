import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootPage from './pages/RootPage.js'
import LoginPage from './pages/LoginPage.js'
import ResgistrationPage from './pages/RegistrationPage.js'
import { checkAuth } from './helper.js'
import HistoryPage from './pages/HistoryPage.js'
import NotePage from './pages/NotePage.js'
// import DefaultPage from './pages/DefaultPage.js'
const router = createBrowserRouter([
  {path:'/',element:<RootPage/>,loader:checkAuth,children:[
    // {index:true,element:<DefaultPage/>},
    {path:'/',element:<NotePage/>},
    {path:'/:id',element:<NotePage/>},
    {path:'history',element:<HistoryPage/>}
  ]},
  {path:'/login',element:<LoginPage/>},
  {path:'/register',element:<ResgistrationPage/>}
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App