import React, { useEffect, useState } from "react";
import { API_URL } from "../api/Url.js";
import { FcApproval } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Chines = () => {
  const [vendorData, setVendorData] = useState([]);

  const allVendorHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newData = await response.json();
      setVendorData(newData.vendors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allVendorHandler();
  }, []);

  //For Scrolling
  const [scroll,setScroll] = useState(0)
  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallary");
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
    <div className="w-[90%] p-2 flex flex-col justify-start mx-auto mt-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-xl text font-bold text-slate-600">Top Restarents </span><span><FcApproval className="ml-2 text-xl"/></span>
        </div>
        <div className="flex gap-10">
          <p className="bg-slate-200 flex justify-center items-center p-2.5 rounded-full hover:bg-slate-300" onClick={()=>handleScroll("left")}><IoIosArrowBack /></p>
          <p className="bg-slate-200 flex justify-center items-center p-2.5 rounded-full hover:bg-slate-300" onClick={()=>handleScroll("right")}><IoIosArrowForward /></p>
        </div>
      </div>
      <div className='flex justify-start p-2 overflow-x-hidden relative' id="chainGallary" onScroll={(e)=>setScroll(e.target.scrollLeft)}>
        {vendorData.map((vendor) => (
          <div  className='flex transition duration-500 hover:scale-90 cursor-pointer '>
            <div className=' p-2' key={vendor._id}>
              {vendor.firm.map((firm) => (
                <div className='min-w-[300px] max-w-[300px] rounded-xl p-2 ' key={firm._id}>
                  <Link to={`/products/${firm._id}/${firm.offer}/${firm.firmName}/${firm.image}`}><img className="h-[220px] w-[350px] rounded-md" src={`${API_URL}/uploads/${firm.image}`} alt="" />
                  <p className="text-lg font-semibold text-slate-700">{firm.firmName}</p>
                  <p className="text-xs flex text-blue-700"><span><MdLocationPin/></span><span>{firm.area}</span></p></Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chines;
