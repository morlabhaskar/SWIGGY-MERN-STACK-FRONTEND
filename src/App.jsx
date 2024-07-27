import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Error from "./pages/error/Error.jsx"
import LandingPage from './pages/LandingPage.jsx'

function App() {
  const Layout = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  )
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          {/* <Route path='dashboard' element={<LandingPage />} /> */}
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>

    </>
  )
}

export default App
