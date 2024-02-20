import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
function RootPage() {
  return (
    <>
    <Header/>
    <main>
    <SideBar/>

    <Outlet/>
    </main>
    </>
  )
}

export default RootPage