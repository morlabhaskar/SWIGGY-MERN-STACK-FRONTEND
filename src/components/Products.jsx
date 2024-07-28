import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../api/Url'

const Products = () => {
    const { firmId, firmName } = useParams()

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
        <div className='min-h-[100vh] w-[80%] mx-auto mt-4'>
            <div className='text-slate-700 font-semibold text-xl my-5'>
                <p className='text-slate-500 text-xs'><Link className='text-blue-500' to='/'>Home</Link> / Restarents / <span className='text-blue-500'>{firmName}</span></p>
            </div>
            <div className='text-slate-700 font-semibold text-xl my-5'>
                <p>{firmName}</p>
            </div>
            {products.length > 0 ? (
                products.map((item) => (
                    <div className='bg-slate-300 flex justify-between m-2 p-2 border-red-700 border'>
                        <div key={item.id}>
                            <p>{item.productName}</p>
                            <p>{item.price}</p>
                            <p>{item.description}</p>
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