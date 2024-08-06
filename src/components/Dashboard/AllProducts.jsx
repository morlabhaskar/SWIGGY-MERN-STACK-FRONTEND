

import React, { useEffect, useState } from 'react';
import { API_URL } from '../../api/Url';
import { CgAddR } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Table, Button, Popconfirm } from 'antd';
import "./styles.css"


import styled from 'styled-components';

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #0ab192; 
    color: #fff; 
    text-align: center; 
    vertical-align: middle; 
  }
  .ant-table-row {
    height: 10px; 
  }
`;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [productss,setProductss] = useState([])

  // Fetch products from the API
  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.log("Failed to fetch products");
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);
  const productCount = products && products ? products.length : 0;

  // Delete product by ID
  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: <span style={{ textAlign: 'center' }}>Name</span>,
      dataIndex: 'productName',
      width: 150,
      align: 'center',
    },
    {
      title: <span style={{ textAlign: 'center' }}>Price</span>,
      dataIndex: 'price',
      width: 100,
      align: 'center',
    },
    {
      title: <span style={{ textAlign: 'center' }}>Image</span>,
      dataIndex: 'image',
      width: 120,
      render: (image, record) => (
        image ? <img className='h-[70px] mx-auto' src={`${API_URL}/uploads/${image}`} alt={record.productName} /> : null
      ),
      align: 'center',
    },
    {
      title: <span style={{ textAlign: 'center' }}>Action</span>,
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this product?"
          onConfirm={() => deleteProductById(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" className='text-red-600 text-xl'>
            <FaRegTrashAlt />
          </Button>
        </Popconfirm>
      ),
      align: 'center',
    },
  ];

  return (
    <div className='p-4  w-full'>
      <div className=''>
        <h1 className='text-blue-600 text-3xl flex items-center'>
          All Products
          <span className='text-[17px] text-teal-500 mx-3 mt-2'>
            <CgAddR />
          </span>
        </h1>
        <hr className='w-[50px] border-t-4 rounded-[10px] border-orange-400'/>
      </div>
      <div className='mt-4'>
        <p className='text-sm'>SHOWS <span className='text-fuchsia-600'>05</span> OUT OFF <span className='text-fuchsia-600'>0{productCount} </span><span>PRODUCTS</span></p>
      </div>
      <div className='flex justify-center items-center'>
        {products.length === 0 ? (
          <p>No Products</p>
        ) : (
          <div className=' max-w-[74vw]'>
            <StyledTable
            columns={columns}
            dataSource={products}
            pagination={{ pageSize: 5 }}
            scroll={{ y: 440 }}
            rowKey="_id" 
            className=' mt-6 border border-emerald-500 border-2 rounded-xl'
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;