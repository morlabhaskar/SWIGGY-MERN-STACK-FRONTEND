import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../api/Url'
import { FaRupeeSign } from 'react-icons/fa'

const Products = () => {
    const { firmId, firmName, firmImage,Offer } = useParams()

    const [products, setProducts] = useState([])

    const productsHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/product/${firmId}`)
            const newProducts = await response.json()
            setProducts(newProducts.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        productsHandler()
    }, [])

    return (
        <div className='w-[80%] mx-auto mt-4'>
            <div className='text-slate-700 font-semibold text-xl my-5'>
                <p className='text-slate-500 text-xs'><Link className='text-blue-500' to='/'>Home</Link> / Restarents / <span className='text-blue-500'>{firmName.replace(/[0-9%]/g, ' ')}</span></p>
            </div>
            <div className='text-slate-700 font-semibold text-xl my-5 w-[80%] mx-auto justify-start flex'>
                <img src={`${API_URL}/uploads/${firmImage}`} className='min-h-64 rounded-tl-[40px] rounded-br-[40px]' alt="" />
                <div className='w-full p-4'>
                    <p className='text-orange-900 text-3xl'>{firmName.replace(/[0-9%]/g, ' ')}</p>
                    <p className='text-slate-400'><span>UPTO {Offer} OFF</span></p>
                </div>
            </div>
            <div className=' my-4'>
                <p className='text-3xl font-semibold'>Available Products</p> <hr className='w-[60px] border-t-4 border-orange-500 rounded-[20px]' />
            </div>
            
            {products.length > 0 ? (
                products.map((item) => (
                    <div className='bg-slate-300 flex justify-between m-2 p-2 border-red-700 border'>
                        <div key={item.id}>
                            <p>{item.productName}</p>
                            <p className='flex items-center'><span><FaRupeeSign /></span><span>{item.price}</span></p>
                            <p>{item.description}</p>
                            <p>{item.category.join(" , ")}</p>
                        </div>
                        <div>
                            <img className='object-cover object-center w-[100px] block' src={`${API_URL}/uploads/${item.image}`} alt="" />
                        </div>
                    </div>
                ))
            ) : (
                <div>No products found</div>
            )}
        </div>


    )
}

export default Products