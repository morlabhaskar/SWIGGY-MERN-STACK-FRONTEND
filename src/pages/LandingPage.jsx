import React, { useEffect, useState } from 'react'

import ItemsDisplay from '../components/ItemsDisplay'
import Chines from '../components/Chines'
import FirmCollection from '../components/FirmCollection'

import { API_URL } from '../api/Url'
import BestPlaces from '../components/BestPlaces'

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
        <div role="status" className="animate-pulse h-[100vh] flex flex-col p-6">
          <div className='w-[90vw] h-[80vh] mx-auto '>
            <div className='flex justify-between'>
              <p className="h-[30px] bg-slate-300 rounded-full border w-[320px] "></p>
              <div className='flex gap-8'>
                <p className="h-[30px] bg-slate-300 rounded-full border  w-[30px]"></p>
                <p className="h-[30px] bg-slate-300 rounded-full border  w-[30px]"></p>
              </div>
            </div>
            <div className='flex gap-8 mt-4 '>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
              <p className="h-[120px] bg-slate-300 rounded-full border w-[120px] "></p>
            </div>
            <div className='flex justify-between mt-10'>
              <p className="h-[30px] bg-slate-300 rounded-full border w-[320px] "></p>
              <div className='flex gap-8'>
                <p className="h-[30px] bg-slate-300 rounded-full border  w-[30px]"></p>
                <p className="h-[30px] bg-slate-300 rounded-full border  w-[30px]"></p>
              </div>
            </div>
            <div className='flex gap-8 mt-7 '>
              <div className='flex flex-col'>
                  <p className="h-[200px] bg-slate-300 rounded-md border w-[230px] "></p>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[150px] mt-2'></span>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[60px] mt-2'></span>
              </div>
              <div className='flex flex-col'>
                  <p className="h-[200px] bg-slate-300 rounded-md border w-[230px] "></p>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[150px] mt-2'></span>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[60px] mt-2'></span>
              </div>
              <div className='flex flex-col'>
                  <p className="h-[200px] bg-slate-300 rounded-md border w-[230px] "></p>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[150px] mt-2'></span>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[60px] mt-2'></span>
              </div>
              <div className='flex flex-col'>
                  <p className="h-[200px] bg-slate-300 rounded-md border w-[230px] "></p>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[150px] mt-2'></span>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[60px] mt-2'></span>
              </div>
              <div className='flex flex-col'>
                  <p className="h-[200px] bg-slate-300 rounded-md border w-[230px] "></p>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[150px] mt-2'></span>
                  <span className='h-[15px] bg-slate-300 rounded-full border w-[60px] mt-2'></span>
              </div>
            </div>

            <div className='flex'>
                <p className="h-[30px] bg-slate-300 rounded-full border  w-[600px] mt-8"></p>
            </div>
          </div>
        </div>

        : (
          <>
            <ItemsDisplay />
            <Chines />
            <FirmCollection />
            <BestPlaces />
          </>
        )}
    </div>
  )
}

export default LandingPage