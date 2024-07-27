import React, { useEffect, useState } from 'react';
import { API_URL } from '../api/Url.js';

const Chines = () => {
  const [vendorData,setVendorData] = useState([]);

  const allVendorHandler = async() => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`)
      // const response = await fetch('https://backend-nodejs-suby.onrender.com/vendor/all-vendors')
      const newData =await response.json()
      setVendorData(newData.vendors)
      console.log(vendorData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    allVendorHandler()
  },[])
  return (
    <div>
      <h1>data :</h1>
      {vendorData.length > 0 ? (
        vendorData.map((vendor)=>(
          <div key={vendor._id}>
            {vendor.firm.map((firm) => (
              <div key={firm._id}>
                <h3>{firm.firmName}</h3>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  )
}

export default Chines