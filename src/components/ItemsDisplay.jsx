import React, { useEffect, useState } from 'react'
import { API_URL } from '../api/Url'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FcApproval } from 'react-icons/fc'

const ItemsDisplay = () => {
  const [products, setProducts] = useState([])

  const productsHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/all-products`)
      const newProducts = await response.json()
      setProducts(newProducts.products);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    productsHandler()
  }, [])

  //For Scrolling
  const [scroll1,setScroll1] = useState(0)
  const handleScroll1 = (direction) => {
    const gallery = document.getElementById("topitems");
    const scrollAmount = 400;

    if(direction == "left"){
      gallery.scrollTo({
        left:gallery.scrollLeft - scrollAmount,
        behavior:"smooth"
      })
    }
    else if(direction == "right"){
      gallery.scrollTo({
        left:gallery.scrollLeft + scrollAmount,
        behavior:"smooth"
      })
    }
  }

  return (
    <div className='w-[90%] mx-auto mt-4'>
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-xl text font-bold text-slate-600">What is your mind ? </span><span><FcApproval className="ml-2 text-xl"/></span>
        </div>
        <div className="flex gap-10">
          <p className="bg-slate-200 flex justify-center items-center p-2.5 rounded-full hover:bg-slate-300" onClick={()=>handleScroll1("left")}><IoIosArrowBack /></p>
          <p className="bg-slate-200 flex justify-center items-center p-2.5 rounded-full hover:bg-slate-300" onClick={()=>handleScroll1("right")}><IoIosArrowForward /></p>
        </div>
      </div>
      <div className='flex my-3 justify-start overflow-x-hidden relative' id='topitems' onScroll={(e)=>setScroll1(e.target.scrollLeft)}>
        {products.map((item) => {
          return (
            <div className='bg-white px-1' key={item.image}>
              <img className='min-h-[150px] max-h-[150px] min-w-[150px] max-w-[150px]' src={`${API_URL}/uploads/${item.image}`} alt={item.image} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ItemsDisplay