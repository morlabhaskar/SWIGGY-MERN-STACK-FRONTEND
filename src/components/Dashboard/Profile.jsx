import React, { useEffect, useState } from 'react';
import { API_URL } from '../../api/Url';
import { RxAvatar } from 'react-icons/rx';
import { AiFillMail } from "react-icons/ai";
import { SiExercism } from "react-icons/si";
import { CgAddR } from 'react-icons/cg';
import { IoMdTime } from "react-icons/io";

const Profile = () => {
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
  const date = vendor1 && vendor1.createdAt 
    ? new Date(vendor1.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')
    : '';

  return (
    <>
      <div className='p-4 w-full'>
        <div>
          <h1 className='text-blue-600 text-3xl flex items-center'>Profile <span className='text-[17px] text-teal-500 mx-3 mt-2'><CgAddR /></span></h1>
          <hr className='w-[50px] border-t-8 rounded-[10px] border-orange-400' />
        </div>
        <div className=' w-full h-full flex justify-center items-center '>
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