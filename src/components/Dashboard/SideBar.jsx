import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoPersonCircleOutline, IoPeopleOutline, IoFastFoodOutline } from "react-icons/io5";
import { CiShoppingBasket, CiShop } from "react-icons/ci";
import { API_URL } from '../../api/Url';

const SideBar = ({ showaddfirmHandler, showaddproductHandler, allproductsHandler, profileHandler, showFirmTitle }) => {
  const [vendor1, setVendor1] = useState([])
  const vendorHandler = async () => {
    const vendorId = localStorage.getItem('vendorId');
    try {
      const response = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await response.json()
      setVendor1(vendorData.vendor)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    vendorHandler()
  }, [])
  return (
    <Wrapper>
      <div className="sidebar w-[100%] max-w-[230px] px-2 h-[710px] flex flex-col justify-between">
        <div className="add flex flex-col items-center gap-2 pt-4">
            <span onClick={profileHandler} className='profile flex items-center gap-2 w-[200px] text-xl hover:bg-slate-300 py-2 rounded-md'><IoPeopleOutline className='text-2xl' />Profile</span>
            {showFirmTitle ? <span onClick={showaddfirmHandler} className='add-firm flex items-center gap-2 w-[200px] text-xl hover:bg-slate-300 py-2 rounded-md'><CiShop className='text-2xl' />Add Firm</span> : ""}
            <span onClick={showaddproductHandler} className='add-product flex items-center gap-2 w-[200px] text-xl hover:bg-slate-300 py-2 rounded-md'><CiShoppingBasket className='text-2xl' />Add Product</span>
            <span onClick={allproductsHandler} className='all-products flex items-center gap-2 w-[200px] text-xl hover:bg-slate-300 py-2 rounded-md'><IoFastFoodOutline className='text-2xl' />All Products</span>
        </div>
        <div className="pro flex flex-col items-center mb-4">
          <span><IoPersonCircleOutline className='text-5xl text-slate-700' /></span>
          <span className='text-lg text-slate-900'>{vendor1.username}</span>
        </div>

      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
    .sidebar {
      box-shadow: 5px 0px 3px -3px #00000030;
    }
    .add span {
      padding-left: 35px;
      cursor: pointer;
    
      
    }
      

`;

export default SideBar