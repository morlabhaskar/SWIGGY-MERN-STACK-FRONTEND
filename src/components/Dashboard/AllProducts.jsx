import React, { useEffect, useState } from 'react'
import { API_URL } from '../../api/Url';

// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}`);
      const newProductData = await response.json()
      setProducts(newProductData.products);
    } catch (error) {
      console.log("failed To Fetch Products")
      alert("Failed To Fetch products")

    }
  }
  useEffect(() => {
    productHandler()
  }, [])
  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        confirm("Are You Sure want to Delete Product! ")
        alert("Product Delete Successfully")
      }

    } catch (error) {
      console.log(error)
      alert("Faited to Product Delete")

    }


  }


  return (
    <div className='w-[1300px] flex justify-center items-center'>
      {products.length === 0 ? (
        <p>No Products</p>
      ) : (
        <table className='products-table w-[700px] items-center border'>
          <thead className='bg-indigo-600 text-slate-50'>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.image && (
                        <img className='h-[70px]' src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
                      )}
                    </td>
                    <td>
                      <button className='border px-2 py-1 rounded-lg text-red-600 ' onClick={() => deleteProductById(item._id)}>Delete</button>
                      {/* <Tooltip title="Delete">
                        <IconButton onClick={() => deleteProductById(item._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip> */}
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts