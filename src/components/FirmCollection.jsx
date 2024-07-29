import React, { useEffect, useState } from 'react'
import { API_URL } from '../api/Url'
import { MdLocationPin } from 'react-icons/md'
import { FaRupeeSign } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { Link } from 'react-router-dom';

const FirmCollection = () => {
  const [firmData, setFirmData] = useState([])

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`)
      const newFirmData = await response.json()
      setFirmData(newFirmData.vendors)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    firmDataHandler()
  }, [])

  //For Styling
  const gradientStyle = {
    background: 'linear-gradient(to right, rgba(24, 24, 24, 0.5), rgba(22, 21, 21, 0.5))'
  };

  //For Filter
  const [selectRegion, setSelectRegion] = useState("All")
  const [activeCategory,setActiveCategory] = useState("All")
  const filterHandler = (region,category) => {
    setSelectRegion(region)
    setActiveCategory(category)
  }

  return (
<section class="body-font py-1 w-[90%] mx-auto">
  <div className='flex justify-start py-6'>
    <p className='text-2xl font-bold text-slate-600'>Restaurants with online food delivery in India</p>
  </div>
  <hr className='mb-[10px] border-fuchsia-700 h-5 w-[80%] mx-auto border-t-4 rounded-full' />
  <div className='flex items-center mb-5'>
    <span className='w-1/6 ml-4 flex justify-center'><CiFilter className='text-blue-500 text-2xl' /></span>
    <div className='flex items-center justify-start gap-20 py-4 w-5/6'>
      <button onClick={() => filterHandler("All","all")} className={`border min-w-[150px] max-w-[150px] p-1 border-slate-500 rounded-xl cursor-pointer text-sm transition duration-500 hover:scale-110 hover:bg-slate-300 ${activeCategory === "all" ? "bg-orange-300" : ""}`}>All</button>
      <button onClick={() => filterHandler("South-Indian","south")} className={`border min-w-[150px] max-w-[150px] p-1 border-slate-500 rounded-xl cursor-pointer text-sm transition duration-500 hover:scale-110 hover:bg-slate-300 ${activeCategory === "south" ? "bg-orange-300" : ""}`}>South Indian</button>
      <button onClick={() => filterHandler("North-Indian","north")} className={`border min-w-[150px] max-w-[150px] p-1 border-slate-500 rounded-xl cursor-pointer text-sm transition duration-500 hover:scale-110 hover:bg-slate-300 ${activeCategory === "north" ? "bg-orange-300" : ""}`}>North Indian</button>
      <button onClick={() => filterHandler("Bakery","bakery")} className={`border min-w-[150px] max-w-[150px] p-1 border-slate-500 rounded-xl cursor-pointer text-sm transition duration-500 hover:scale-110 hover:bg-slate-300 ${activeCategory === "bakery" ? "bg-orange-300" : ""}`}>Bekary</button>
    </div>
  </div>
  <hr className='mb-[30px] border-fuchsia-700 h-5 w-[80%] mx-auto border-t-4 rounded-full' />
  <div class="container px-1 mx-auto w-full my-4">
    <div class="flex flex-wrap -m-10">
      {firmData.map((apple) => {
        return apple.firm.map((item) => {
          if (selectRegion === "All" || item.region.includes(selectRegion.toLocaleLowerCase())) {

            return (
              <>
                <Link to={`/products/${item._id}/${item.offer}/${item.firmName}/${item.image}`} className="lg:w-1/4 md:w-1/2  p-4 w-full transition duration-500 hover:scale-90 cursor-pointer">
                  <a className="relative block h-48 rounded overflow-hidden">
                    <img alt="firm" className="object-cover object-center w-full h-full block" src={`${API_URL}/uploads/${item.image}`} />
                    <p>
                      <p className='absolute bottom-0 w-full text-white bg-slate-800 px-2 font-semibold' style={gradientStyle}>
                        <span className='text-white mr-2 flex py-2 text-lg justify-center'><span className='mr-2'>UPTO</span>{item.offer}<span className='ml-2 mr-2'>ABOVE</span><span className='flex items-center'><FaRupeeSign /><span>300</span></span></span>
                      </p>
                    </p>
                  </a>

                  <div className="mt-4">
                    <h2 className="text-gray-900 title-font text-lg font-semibold">{item.firmName}</h2>
                    <p className="mt-1 text-slate-700">{item.region.join(" ,")}</p>
                    <h3 className="text-green-700 text-xs tracking-widest title-font mb-1 flex items-center mt-2"><span><MdLocationPin /></span><span>{item.area}</span></h3>
                  </div>
                </Link>
              </>
            )
          }
        })
        return null;
      })}
    </div>
  </div>
</section>
  )
}

export default FirmCollection