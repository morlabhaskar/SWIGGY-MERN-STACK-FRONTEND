import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Error from "./pages/error/Error.jsx"
import LandingPage from './pages/LandingPage.jsx'
import Products from './components/Products.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const Layout = () => (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='/products/:firmId/:firmName' element={<Products />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>

    </>
  )
}

export default App
