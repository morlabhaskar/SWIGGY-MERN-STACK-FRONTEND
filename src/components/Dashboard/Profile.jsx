import React, { useEffect, useState } from 'react';
import { API_URL } from '../../api/Url';
import { RxAvatar } from 'react-icons/rx';
import { AiFillMail } from "react-icons/ai";
import { SiExercism } from "react-icons/si";
import { CgAddR } from 'react-icons/cg';
import { IoMdTime } from "react-icons/io";
import logo1 from '/public/assets/logo.jpeg'

const Profile = () => {
  const [vendor1, setVendor1] = useState([])
  const [productss, setProductss] = useState([])
  const vendorHandler = async () => {
    const vendorId = localStorage.getItem('vendorId');
    try {
      const response = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await response.json()
      setVendor1(vendorData.vendor)
      setProductss(vendorData.vendor.firm[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    vendorHandler()
  }, [])
  const date = vendor1 && vendor1.createdAt
    ? new Date(vendor1.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')
    : '';

  const productCount = productss && productss.products ? productss.products.length : 0;

  return (
    <>
      <div className='p-4 w-full'>
        <div>
          <h1 className='text-blue-600 text-3xl flex items-center'>Profile <span className='text-[17px] text-teal-500 mx-3 mt-2'><CgAddR /></span></h1>
          <hr className=' w-[50px] border-t-4 rounded-[3px] border-orange-400' />
        </div>
        <div className='mt-4 flex justify-center text-3xl text-emerald-800'>
          <p className='flex items-center'><p>--</p><p className='px-2'>{productss.firmName}</p><p>--</p></p>
        </div>
        <div className='p-2 mt-4 flex justify-center'>
          <p className='p-2 flex border border-yellow-500 border-2 rounded-lg'>
            <img src={logo1} className='h-20' alt={logo1} />
            <div className='flex flex-col justify-center p-2'>
              <p className='text-sm text-slate-500'>Total Products :</p>
              <p className='text-3xl ml-10'>{productCount}</p>
            </div>
          </p>
        </div>
        <div className=' w-full mt-4 flex justify-center items-center '>
          <div className='bg-white p-6 flex justify-between min-w-[600px] max-w-[600px] border border-fuchsia-500 border-2 rounded-xl'>
            <div className='flex items-center'>
              <p><RxAvatar className='text-[250px] text-fuchsia-500' /></p>
            </div>
            <div className='p-3 flex flex-col justify-center gap-3'>
              <p className='flex items-center gap-3'><SiExercism className='text-blue-600' /><span>{vendor1.username}</span></p>
              <p className='flex items-center gap-3'><AiFillMail className='text-blue-600' /><span>{vendor1.email}</span></p>
              <p className='flex items-center gap-3'><IoMdTime className='text-blue-600' /><span>{date}</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile