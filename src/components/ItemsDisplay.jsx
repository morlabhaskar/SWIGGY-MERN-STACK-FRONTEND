import React, { useState } from 'react'
import { itemData } from '../../public/assets/data'

const ItemsDisplay = () => {
  const [displayItem,setDisplayItem] = useState(itemData);
  return (
    <div className='bg-white w-[90%] mx-auto mt-2'>
      <h1 className='text-xl font-bold ml-2 pt-6 text-slate-600'>What's on your mind?</h1>
      <div className='flex my-3'>
      {displayItem.map((item) => {
        return (
          <div className='bg-white px-1' key={item.item_img}>
              <img className='h-40 w-40' src={item.item_img} alt={item.item_img} />
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default ItemsDisplay