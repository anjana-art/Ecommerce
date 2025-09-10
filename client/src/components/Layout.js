import React from 'react'
import Header from './Header.js'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen bg-fuchsia-100'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout
