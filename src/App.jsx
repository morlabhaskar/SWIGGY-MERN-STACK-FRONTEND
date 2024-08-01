import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Error from "./pages/error/Error.jsx"
import LandingPage from './pages/LandingPage.jsx'
import Products from './components/Products.jsx'
import Footer from './components/Footer.jsx'
import VendorDashboard from '../src/pages/VendorDashboard.jsx'
// import BestPlaces from './components/BestPlaces.jsx'

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
          {/* <Route index element={<BestPlaces />} /> */}
          <Route path='/products/:firmId/:Offer/:firmName/:firmImage' element={<Products />} />
          <Route path='/dashboard' element={<VendorDashboard />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>

    </>
  )
}

export default App
