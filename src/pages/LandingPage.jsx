import React, { useEffect, useState } from 'react'

import ItemsDisplay from '../components/ItemsDisplay'
import Chines from '../components/Chines'
import FirmCollection from '../components/FirmCollection'

import { API_URL } from '../api/Url'

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [] = await Promise.all([
        fetch(`${API_URL}/product/all-products`),
        fetch(`${API_URL}/vendor/all-vendors`),
        fetch(`${API_URL}/vendor/all-vendors`),
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ?

        <div role="status" className="animate-pulse h-[100vh] flex flex-col p-7 border border-red-500">
          <div>
            <div className='flex flex-col'>
              <div className="h-[25px] bg-gray-300 rounded-full dark:bg-gray-400 max-w-[640px] mb-2.5 border border-red-500"></div>
              <div className='flex'>
                <div className="h-[25px] bg-gray-300 rounded-full dark:bg-gray-400 max-w-[640px] mb-2.5 border border-red-500"></div>
                <div className="h-[25px] bg-gray-300 rounded-full dark:bg-gray-400 max-w-[640px] mb-2.5 border border-red-500"></div>
              </div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5"></div>
            <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
            <div className="flex items-center justify-center mt-4">
              <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
        </div>

        : (
          <>
            <ItemsDisplay />
            <Chines />
            <FirmCollection />
          </>
        )}
    </div>
  )
}

export default LandingPage